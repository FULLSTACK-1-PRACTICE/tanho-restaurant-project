import { useState, useCallback } from "react";
import { STATIC_DATA } from "../../../data/adminData";

export function useCrud<T extends { id?: string }>(collectionName: string) {
  const [items, setItems] = useState<T[]>(
    () => [...(STATIC_DATA[collectionName] ?? [])] as T[]
  );

  const loading = false;

  const add = useCallback(
    async (data: Omit<T, "id">) => {
      setItems((current) => [
        ...current,
        {
          ...data,
          id: `${collectionName}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
        } as T,
      ]);
    },
    [collectionName]
  );

  const update = useCallback(
    async (id: string, data: Partial<T>) => {
      setItems((current) =>
        current.map((item) =>
          item.id === id ? { ...item, ...data, id } : item
        )
      );
    },
    []
  );

  const remove = useCallback(async (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  return {
    items,
    loading,
    add,
    update,
    remove,
  };
}