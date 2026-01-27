import { application } from "express";
import prisma from "../../connection/prisma.js";

export const hadnleUpdateRecruiterProfile = async (req, res) => {
  const { company } = req.body;
  if (!company) {
    return res.status(400).json({ error: "bad request" });
  }

  const user = req.user;
  if (user.role !== "RECRUITER") {
    return res.status(403).json({ error: "forbidden access" });
  }
  try {
    const updatedRecruter = await prisma.recruter.update({
      where: { userId: req.user.id },
      data: { company },
    });
    res.status(200).json({ message: updatedRecruter });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error updating recruiter profile:", error);
  }
};

export const handleGetRecruiterProfile = async (req, res) => {
  const user = req.user;
  if (user.role !== "RECRUITER") {
    return res.status(403).json({ error: "forbidden access" });
  }
  try {
    const recruiter = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        city: true,
        phone: true,
        role: true,
        recruter: {
          select: {
            company: true,
            jobs: [
              {
                select: {
                  id: true,
                  title: true,
                  _count: {
                    select: { applications: true },
                  },
                  location: true,
                  createdAt: true,
                },
              },
            ],
          },
        },
      },
    });

    res.status(200).json({ recruiter });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
    console.error("Error fetching recruiter profile:", error);
  }
};
