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
    const recruiter = await prisma.recruter.findUnique({
      where: { userId: req.user.id },
    });
    if (!recruiter) {
      await prisma.recruter.create({
        data: {
          userId: req.user.id,
          company,
        },
      });
    }
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
