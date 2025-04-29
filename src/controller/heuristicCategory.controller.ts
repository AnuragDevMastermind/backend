import { Request, Response } from "express";
import { createHeuristicCategory, updateHeuristicCategory, deleteHeuristicCategory, getAllHeuristicCategories } from "../db/repositories/heuristicCategory.repository";

export const createNewHeuristicCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;
    const newCategory = await createHeuristicCategory(categoryData);

    res.status(201).json({
      message: "Heuristic category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating heuristic category:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const updateExistingHeuristicCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const updatedCategory = await updateHeuristicCategory(category._id, category);

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Heuristic category not found",
      });
    }

    res.status(200).json({
      message: "Heuristic category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating heuristic category:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const deleteExistingHeuristicCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.body;
    const deletedCategory = await deleteHeuristicCategory(category._id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Heuristic category not found",
      });
    }

    res.status(200).json({
      message: "Heuristic category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.error("Error deleting heuristic category:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const getAllHeuristicCategory = async (req: Request, res: Response) => {
  try {
    const categories = await getAllHeuristicCategories();

    res.status(200).json({
      message: "Heuristic categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching heuristic categories:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
