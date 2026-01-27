import prisma from "../../connection/prisma.js";

export const handleGetDashboard = async (req, res) => {
  try {
    const [totalUser, totalJobs, openJobs, closedJobs, recentUsers] =
      await prisma.$transaction([
        prisma.user.count(),
        prisma.job.count(),
        prisma.job.count({
          where: {
            jobStatus: "OPEN",
          },
        }),
        prisma.job.count({
          where: {
            jobStatus: "CLOSED",
          },
        }),
        prisma.user.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          select: {
            id: true,
            name: true,
            email: true,
            city: true,
            phone: true,
            role: true,
            picture: true,
            createdAt: true,
          },
        }),
      ]);
    res.status(200).json({
      totalUser,
      totalJobs,
      openJobs,
      closedJobs,
      recentUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
    console.error("Error fetching dashboard data:", error);
  }
};

export const handleGetAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) {
      return res.status(404).json({ error: "no users found" });
    }
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching users:", error);
  }
};

export const handleGetRecruiters = async (req, res) => {
  try {
    const users = await prisma.recruter.findMany();
    if (!users) {
      return res.status(404).json({ error: "no recruiter found" });
    }
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching users:", error);
  }
};

export const handleGetJobseeker = async (req, res) => {
  try {
    const users = await prisma.jobSeeker.findMany();
    if (!users) {
      return res.status(404).json({ error: "no jobseeker found" });
    }
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching users:", error);
  }
};

export const handleGetJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();
    if (!jobs) {
      return res.status(404).json({ error: "no job found" });
    }
    res.status(200).json({ message: jobs });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching jobs:", error);
  }
};

export const handleGetAllApplications = async (req, res) => {
  try {
    const application = await prisma.job.findMany();
    if (!application) {
      return res.status(404).json({ error: "no job found" });
    }
    res.status(200).json({ message: application });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching application:", error);
  }
};
