export interface Item {
  id: string;
  name: string;
  description: string;
}

export const items: Item[] = [
  { id: '1', name: 'Item 1', description: 'Description 1' },
  { id: '2', name: 'Item 2', description: 'Description 2' },
  { id: '3', name: 'Item 3', description: 'Description 3' },
];

interface FetchItemsFilters {
  page: number;
  pageSize: number;
  search?: string;
}

export const fetchItems = (filters: FetchItemsFilters) => {
  const { page, pageSize, search } = filters;
  let filteredItems = items;

  if (search) {
    filteredItems = items.filter((item) => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return Promise.resolve({
    data: filteredItems.slice(start, end),
    total: filteredItems.length,
  });
};

interface CreateItemData {
  name: string;
  description: string;
}

export const createItem = (newItem: CreateItemData) => {
  return new Promise<Item>((resolve) => {
    setTimeout(() => {
      const id = (items.length + 1).toString();
      const item = { id, ...newItem };
      items.push(item);
      resolve(item);
    }, 2000); // 2 segundos de retraso
  });
}; 