'use client';

import { useRouter } from 'next/navigation';
import { Languages } from 'lucide-react';
import { Button } from './ui/button';

interface BlogLanguageToggleProps {
  alternateLangPost?: {
    slug: string;
    lang: 'en' | 'id';
  } | null;
}

export default function BlogLanguageToggle({
  alternateLangPost,
}: BlogLanguageToggleProps) {
  const router = useRouter();

  if (!alternateLangPost) return null;

  const alternateLabel = alternateLangPost.lang === 'en' ? 'English' : 'Bahasa Indonesia';

  const handleSwitchLanguage = () => {
    router.push(`/blog/${alternateLangPost.slug}`);
  };

  return (
    <div className="mb-8">
      <Button
        variant="outline"
        onClick={handleSwitchLanguage}
        className="hover:bg-foreground hover:text-background"
      >
        <Languages className="w-4 h-4 mr-2" />
        Read in {alternateLabel}
      </Button>
    </div>
  );
}
