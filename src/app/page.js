"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryTabs from "./components/CategoryTabs";
import SubCategoryTabs from "./components/SubCategoryTabs";
import ProfessionalCard from "./components/ProfessionalCard";
import ServiceCardSkeleton from "./components/skeletons/ServiceCardSkeleton";
import ErrorState from "./components/ui/ErrorState";
import EmptyState from "./components/ui/EmptyState";
import { fetchWorkersByCategory } from "@/lib/api";
import { Search } from "lucide-react";

export default function HomePage() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const {
    data: workers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workers", subCategory],
    queryFn: () => fetchWorkersByCategory(subCategory),
    enabled: !!subCategory,
  });

  const handleCategoryChange = (val) => {
    setCategory(val);
    setSubCategory("");
  };

  const renderContent = () => {
    if (!category) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Search className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-sm font-medium">Select a category to get started</p>
        </div>
      );
    }

    if (category && !subCategory) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-sm font-medium">Please select a sub-category</p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      );
    }

    if (isError) {
      return (
        <ErrorState
          title="Couldn't load professionals"
          message={error?.message || "Something went wrong while fetching data."}
          onRetry={() => refetch()}
        />
      );
    }

    if (workers.length === 0) {
      return (
        <EmptyState
          title="No professionals found"
          message={`We couldn't find any professionals for ${subCategory} in your area.`}
        />
      );
    }

    return (
      <div className="space-y-4">
        {workers.map((worker) => (
          <ProfessionalCard 
            key={worker.id} 
            professional={worker} 
            subCategory={subCategory} 
          />
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Category Selection */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b">
        <CategoryTabs
          value={category}
          onChange={handleCategoryChange}
        />
        
        {/* Sub Category Selection */}
        {category && (
          <div className="border-t">
            <SubCategoryTabs value={subCategory} onChange={setSubCategory} />
          </div>
        )}
      </div>

      <section className="px-4 mt-6">
        {renderContent()}
      </section>
    </main>
  );
}
