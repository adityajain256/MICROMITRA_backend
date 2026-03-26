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
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        skills: true,
      },
    });
    console.log(jobs);
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

export const handleGetJob = async (req, res) => {
  const jobId = parseInt(req.params.id);
  try {
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        applications: {
          include: {
            jobSeeker: {
              include: {
                user: {
                  select: {
                    name: true,
                    email: true,
                    city: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    // skills: true,

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ job });
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const handleCloseJob = async (req, res) => {
  const jobId = parseInt(req.params.id);
  try {
    const job = await prisma.job.update({
      where: { id: jobId },
      data: {
        jobStatus: "CLOSED",
      },
    });
    await prisma.application.deleteMany({
      where: {
        jobId: jobId,
        OR: [{ status: "REJECTED" }, { status: "PENDING" }],
      },
    });
    res.status(200).json({ message: "Job closed successfully", job });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const jobDelete = async (req, res) => {
  const jobId = parseInt(req.params.id);
  try {
    await prisma.job.delete({
      where: { id: jobId },
    });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
