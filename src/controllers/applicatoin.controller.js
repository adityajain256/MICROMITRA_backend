import { connect } from "node:http2";
import prisma from "../../connection/prisma.js";

// only for admin and jobseeker to view all applications, not for recruiters
export const handleGetAllApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        job: {
          include: {
            recruiter: {
              include: {
                user: true,
              },
            },
          },
        },
        jobseeker: {
          include: {
            user: true,
          },
        },
      },
    });
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// for jobseeker to view their own applications, and for admin to view any application by id
export const handleGetApplicationById = async (req, res) => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ application });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// for recruiter to get all the application that have applied to their jobs
export const handleGetApplicationsForMyJobs = async (req, res) => {
  const jobId = parseInt(req.params.jobId);
  try {
    const userId = req.user.id;
    const applications = await prisma.application.findMany({
      where: {
        jobId: jobId,
      },
    });
    if (!applications) {
      return res
        .status(402)
        .json({ message: "error in fetching applications for this job" });
    }

    res.status(200).json({ applications });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// for creating applicaitons
export const handleCreateApplication = async (req, res) => {
  const { jobId } = req.body;
  try {
    const applicatoin = await prisma.application.create({
      data: {
        // jobId,
        jobSeeker: {
          connect: {
            id: req.user.id,
          },
        },
        job: {
          connect: {
            id: jobId,
          },
        },
      },
    });
    res.status(201).json({
      message: "Application created successfully",
      application: applicatoin,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// for updating application status
export const handleUpdateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const applicationId = parseInt(req.params.id);
  try {
    const application = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });
    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// for deleting an application
export const handleDeleteApplication = async (req, res) => {
  const applicationId = parseInt(req.params.id);
  try {
    await prisma.application.delete({
      where: { id: applicationId },
    });
    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
