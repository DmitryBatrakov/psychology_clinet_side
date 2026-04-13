'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useDeferredValue, useEffect, useState } from 'react';
import { normalize } from './page';

function SearchInput({ onChange }: { onChange?: (str: string) => void }) {
  const [search, setSearch] = useState<string>('');
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    const id = setTimeout(() => onChange && onChange(normalize(deferredSearch).trim()), 200);
    return () => clearTimeout(id);
  }, [deferredSearch]);

  return (
    <Label className="relative">
      <Search size={20} className="text-muted-foreground absolute left-2" />
      <Input
        value={search}
        className="w-68 pl-9"
        placeholder="Search by name or number..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </Label>
  );
}

export default SearchInput;
