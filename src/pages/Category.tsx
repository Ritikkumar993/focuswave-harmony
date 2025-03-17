
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { mentalBenefits, MentalBenefit, SubCategory } from "@/lib/data";
import SubCategoryScreen from "@/components/SubCategoryScreen";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<MentalBenefit | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);

  useEffect(() => {
    if (categoryId) {
      const foundCategory = mentalBenefits.find(b => b.id === categoryId);
      if (foundCategory) {
        setCategory(foundCategory);
        setSelectedSubCategory(foundCategory.subCategories[0]);
      }
    }
  }, [categoryId]);

  if (!category) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-lg text-darkGray">Category not found</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="animate-fade-in">
        <div className="flex items-center mb-6 text-sm text-darkGray">
          <span>Mental Benefits</span>
          <ChevronRight size={16} className="mx-1" />
          <span className="font-medium text-navy">{category.name}</span>
        </div>
        
        <h1 className="text-3xl font-bold text-navy mb-6">{category.name}</h1>
        
        {category.subCategories.length > 1 && (
          <div className="flex overflow-x-auto gap-2 pb-4 mb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {category.subCategories.map((subCategory) => (
              <button
                key={subCategory.id}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap",
                  selectedSubCategory?.id === subCategory.id
                    ? "bg-teal text-navy"
                    : "bg-white text-darkGray hover:bg-softGray"
                )}
                onClick={() => setSelectedSubCategory(subCategory)}
              >
                {subCategory.name}
              </button>
            ))}
          </div>
        )}
        
        {selectedSubCategory && (
          <SubCategoryScreen subCategory={selectedSubCategory} />
        )}
      </div>
    </AppLayout>
  );
};

export default Category;
