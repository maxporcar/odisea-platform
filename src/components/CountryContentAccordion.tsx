
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';
import { CountryContent } from '@/hooks/useCountryContent';

interface CountryContentAccordionProps {
  content: CountryContent[];
  countryName: string;
}

const CountryContentAccordion: React.FC<CountryContentAccordionProps> = ({ content, countryName }) => {
  const { t } = useTranslation();

  // Define section order and icons
  const sectionOrder = [
    { key: 'overview', icon: '📋' },
    { key: 'culture', icon: '🎭' },
    { key: 'life_activities', icon: '🎨' },
    { key: 'scholarships', icon: '💰' },
    { key: 'visa', icon: '📋' },
    { key: 'medical', icon: '🏥' }
  ];

  // Sort content by defined order
  const sortedContent = sectionOrder
    .map(({ key, icon }) => {
      const item = content.find(c => c.section === key);
      return item ? { ...item, icon } : null;
    })
    .filter(Boolean) as (CountryContent & { icon: string })[];

  if (sortedContent.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
        <div className="text-center text-muted-foreground">
          <p>Content is being updated. Please check back soon!</p>
        </div>
      </div>
    );
  }

  // Simple markdown renderer (basic implementation)
  const renderMarkdown = (markdown: string) => {
    if (!markdown) return null;
    
    // Convert basic markdown to HTML
    let html = markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraph tags
    html = '<p>' + html + '</p>';
    
    return (
      <div 
        className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="font-glacial text-2xl font-bold text-foreground">
          📚 Study Guide for {countryName}
        </h2>
        <p className="text-muted-foreground mt-2">
          Comprehensive information to help you plan your studies abroad
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {sortedContent.map((item) => (
          <AccordionItem key={item.section} value={item.section} className="border-border">
            <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-poppins font-semibold text-left">
                  {t(`countryDetail.sections.${item.section}`, item.section.replace('_', ' '))}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {renderMarkdown(item.content_md)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CountryContentAccordion;
