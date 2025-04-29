import { HeuristicCategoryModel } from "../../models/heuristicCategory.model";

export const createHeuristicCategory = (
  values: Record<string, any>
) => new HeuristicCategoryModel(values).save().then((category) => category.toObject());

export const updateHeuristicCategory = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return HeuristicCategoryModel.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true }
  );
};

export const deleteHeuristicCategory = (id: string) => {
  return HeuristicCategoryModel.findByIdAndDelete(id);
};

export const getAllHeuristicCategories = () => {
  return HeuristicCategoryModel.find();
};

export const getCategoryByKeywords = (
  keywords: Array<String>
) => HeuristicCategoryModel.aggregate([
  {
    $match: {
      keywords: {
        $in: keywords
      }
    }
  },
  {
    $project: {
      _id: 0,
      category: "$name"
    }
  },
  {
    $limit: 1
  }
]).then(results => results[0]?.category || null);