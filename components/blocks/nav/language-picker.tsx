'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe2 } from 'lucide-react';
import React, { useState } from 'react';

const LANGUAGE_LIST = ['English', 'Hebrew', 'Russion'];

function LanguagePicker() {
  const [language, setLanguage] = useState(LANGUAGE_LIST[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'sm'} variant={'outline'} className="gap-2">
          <Globe2 /> <span>{language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {LANGUAGE_LIST.map((l) => (
            <DropdownMenuCheckboxItem
              key={l}
              checked={l === language}
              onCheckedChange={(value) => setLanguage(l)}
            >
              {l}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguagePicker;
