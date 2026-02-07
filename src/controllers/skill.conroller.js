import prisma from "../../connection/prisma.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    if (skills.length === 0) {
      return res.status(404).json({ error: "No skills found" });
    }
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
