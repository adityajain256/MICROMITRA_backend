import prisma from "../../connection/prisma.js";

export const hadnleUpdateJobSeekerProfile = async (req, res) => {
  const { skillId } = req.body;
  if (!skillId) {
    return res.status(400).json({ error: "bad request" });
  }
  const user = req.user;
  if (user.role !== "JOBSEEKER") {
    return res.status(403).json({ error: "forbidden access" });
  }
  try {
    const jobSeeker = await prisma.jobSeeker.update({
      where: { userId: req.user.id },
      data: {
        skills: {
          connect: {
            id: skillId,
          },
        },
      },
    });

    res
      .status(200)
      .json({ message: "Job seeker profile updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const handleGetJobSeekerProfile = async (req, res) => {
  const user = req.user;
  if (user.role !== "JOBSEEKER") {
    return res.status(403).json({ error: "forbidden access" });
  }
  try {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.user.id },
      select: {
        id: true,
        skills: true,
        user: {
          select: {
            email: true,
            name: true,
            role: true,
            city: true,
            phone: true,
          },
        },
      },
    });
    if (!jobSeeker) {
      return res.status(404).json({ error: "job seeker profile not found" });
    }
    // const userDetails = await prisma.user.findUnique({
    //   where: { id: req.user.id },
    //   select: {
    //     email: true,
    //     name: true,
    //     role: true,
    //     city: true,
    //     phone: true,
    //     jobSeeker: {
    //       select: {
    //         skills: true,
    //       },
    //     },
    //   },
    // });
    res.status(200).json(jobSeeker);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
