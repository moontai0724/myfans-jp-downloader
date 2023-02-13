interface Paginated<T> {
  data: T[];
  pagination: {
    current: number;
    next: number | null;
    previous: number | null;
  };
}
