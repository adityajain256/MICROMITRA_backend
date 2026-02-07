import prisma from "../../connection/prisma.js";

export const handleGetAllJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        recruiter: {
          select: {
            id: true,
            company: true,
          },
        },
        skills: true,
      },
    });
    // console.log(jobs);
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handlecreateJob = async (req, res) => {
  try {
    const { title, description, salary, address, skillIds } = req.body;
    const userId = req.user.id; // from auth middleware

    // 1️⃣ basic validation
    if (!title || !description || !address) {
      return res.status(400).json({
        message: "Title, description and address are required",
      });
    }

    // 2️⃣ find recruiter linked to this user
    const recruiter = await prisma.recruter.findUnique({
      where: { userId },
    });

    if (!recruiter) {
      return res.status(403).json({
        message: "Only recruiters can post jobs",
      });
    }

    // 3️⃣ create job with optional skills
    const job = await prisma.job.create({
      data: {
        title,
        description,
        salary,
        address,
        recruiterId: recruiter.id,
        skills: skillIds?.length
          ? {
              connect: skillIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        skills: true,
      },
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handleGetMyJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobs = await prisma.job.findMany({
      where: {
        recruiter: {
          userId: userId,
        },
      },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
