import prisma from "../../connection/prisma.js";

export const hadnleUpdateJobSeekerProfile = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "bad request" });
  }
  const user = req.user;
  if (user.role !== "JOBSEEKER") {
    return res.status(403).json({ error: "forbidden access" });
  }
  try {
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: req.user.id },
    });
    if (!jobSeeker) {
      await prisma.jobSeeker.create({
        data: {
          userId: req.user.id,
        },
      });
    }
    console.log(name);
    const skill = await prisma.skill.create({
      data: {
        name: name,
      },
    });

    res.status(200).json({ message: skill });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
