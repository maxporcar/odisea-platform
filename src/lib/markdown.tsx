import React, { ReactElement } from 'react';

// Centralized markdown renderer with optimized spacing
export const renderMarkdown = (content: string): ReactElement | null => {
  if (!content) return null;
  
  // Clean content - remove surrounding quotes and normalize line breaks
  let cleanContent = content.replace(/^\"|\"$/g, '');
  
  // Remove excessive blank lines - keep max 1 empty line between sections
  cleanContent = cleanContent.replace(/\n{3,}/g, '\n\n');
  
  // Trim trailing whitespace from each line
  cleanContent = cleanContent.split('\n').map(line => line.trimEnd()).join('\n');
  
  // Handle Festival Calendar sections - convert to chronological table by month
  cleanContent = cleanContent.replace(/(?:🎭\s*)?Festival Calendar[\s\S]*?(?=\n#{1,3}|$)/gi, (match) => {
    const lines = match.split('\n').filter(line => line.trim());
    const festivals = [];
    
    // Parse various festival formats
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && !line.startsWith('#') && !line.includes('---')) {
        let festival = null;
        
        // Format: "Festival | Location | Date | Description"
        if (line.includes('|') && line.split('|').length >= 3) {
          const parts = line.split('|').map(p => p.trim());
          festival = {
            name: parts[0].replace(/^\*\*|\*\*$/g, '').replace(/^-\s*/, ''),
            location: parts[1] || '',
            dates: parts[2] || '',
            description: parts[3] || parts[1] || ''
          };
        }
        // Format: "- **Festival** (Month): Description"
        else if (line.includes('**') && (line.includes('Jan') || line.includes('Feb') || line.includes('Mar') || 
                 line.includes('Apr') || line.includes('May') || line.includes('Jun') || line.includes('Jul') || 
                 line.includes('Aug') || line.includes('Sep') || line.includes('Oct') || line.includes('Nov') || 
                 line.includes('Dec'))) {
          const nameMatch = line.match(/\*\*(.*?)\*\*/);
          const monthMatch = line.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s*\d*/);
          const description = line.replace(/^\*\*.*?\*\*/, '').replace(/\(.*\)/, '').replace(/^[:-\s]*/, '');
          
          if (nameMatch && monthMatch) {
            festival = {
              name: nameMatch[1],
              month: monthMatch[0],
              dates: monthMatch[0],
              description: description || 'Popular festival celebration'
            };
          }
        }
        
        if (festival) {
          festivals.push(festival);
        }
      }
    }
    
    if (festivals.length === 0) return match;
    
    // Sort festivals by month
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    festivals.sort((a, b) => {
      const aMonth = monthOrder.findIndex(m => (a.dates || a.month || '').includes(m));
      const bMonth = monthOrder.findIndex(m => (b.dates || b.month || '').includes(m));
      return aMonth - bMonth;
    });
    
    // Generate HTML table with consistent spacing
    const tableRows = festivals.map(f =>
      `<tr class="border-b border-border/50">
        <td class="py-2 pr-4 font-medium text-foreground">${f.name}</td>
        <td class="py-2 pr-4 text-sm text-muted-foreground">${f.dates}</td>
        <td class="py-2 text-sm text-muted-foreground">${f.description}</td>
      </tr>`
    ).join('');
    
    return `<div class="mb-6">
      <h3 class="font-poppins text-lg font-semibold text-foreground mb-3">
        Festival Calendar
      </h3>
      <div class="overflow-x-auto">
        <div class="bg-card border border-border rounded-lg shadow-sm">
          <table class="w-full">
            <thead>
              <tr class="border-b border-border">
                <th class="text-left py-3 px-4 font-semibold text-foreground bg-muted/30 first:rounded-tl-lg">Festival</th>
                <th class="text-left py-3 px-4 font-semibold text-foreground bg-muted/30">Date</th>
                <th class="text-left py-3 px-4 font-semibold text-foreground bg-muted/30 last:rounded-tr-lg">Description</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
        </div>
      </div>
    </div>`;
  });

  // Handle DO's and DON'Ts as a two-column table
  cleanContent = cleanContent.replace(/\*\*Do['']?s?\*\*:?[\s\S]*?(?=\*\*Don['']?t['']?s?\*\*|$)/gi, (dosMatch) => {
    const allContent = cleanContent;
    const dosStartIndex = allContent.indexOf(dosMatch);
    const dontsStartIndex = allContent.indexOf('**Don', dosStartIndex);
    
    let dosItems = [];
    let dontItems = [];
    
    // Parse Do's
    const dosLines = dosMatch.split('\n').filter(line => line.trim());
    for (let i = 1; i < dosLines.length; i++) {
      const line = dosLines[i].trim();
      if (line && line.startsWith('-')) {
        const text = line.replace(/^-\s*/, '').trim();
        if (text && !text.includes('**Don')) dosItems.push(text);
      }
    }
    
    // Parse Don'ts if they exist
    if (dontsStartIndex > -1) {
      const dontsSection = allContent.substring(dontsStartIndex);
      const dontsMatch = dontsSection.match(/\*\*Don['']?t['']?s?\*\*:?[\s\S]*$/gi);
      if (dontsMatch) {
        const dontsLines = dontsMatch[0].split('\n').filter(line => line.trim());
        for (let i = 1; i < dontsLines.length; i++) {
          const line = dontsLines[i].trim();
          if (line && line.startsWith('-')) {
            const text = line.replace(/^-\s*/, '').trim();
            if (text) dontItems.push(text);
          }
        }
      }
    }
    
    if (dosItems.length === 0 && dontItems.length === 0) return '';
    
    const dosItemsHtml = dosItems.map(item => 
      `<div class="flex items-start p-3 rounded-lg bg-green-50 border-l-4 border-green-500">
        <div class="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <span class="text-green-800 text-sm leading-relaxed">${item}</span>
      </div>`
    ).join('');
    
    const dontItemsHtml = dontItems.map(item => 
      `<div class="flex items-start p-3 rounded-lg bg-red-50 border-l-4 border-red-500">
        <div class="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
        <span class="text-red-800 text-sm leading-relaxed">${item}</span>
      </div>`
    ).join('');
    
    return `<div class="bg-white rounded-xl border border-border shadow-sm p-6 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${dosItems.length > 0 ? `
        <div>
          <h4 class="font-poppins text-lg font-semibold text-green-700 mb-4 flex items-center">
            <span class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </span>
            Do's
          </h4>
          <div class="space-y-3">${dosItemsHtml}</div>
        </div>` : ''}
        ${dontItems.length > 0 ? `
        <div>
          <h4 class="font-poppins text-lg font-semibold text-red-700 mb-4 flex items-center">
            <span class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </span>
            Don'ts
          </h4>
          <div class="space-y-3">${dontItemsHtml}</div>
        </div>` : ''}
      </div>
    </div>`;
  });

  // Remove separate Don'ts processing since it's handled above
  cleanContent = cleanContent.replace(/\*\*Don['']?t['']?s?\*\*:?[\s\S]*?$/gi, '');

  // Handle markdown tables with modern styling
  cleanContent = cleanContent.replace(/^\|(.+)\|/gm, (match) => {
    const lines = cleanContent.split('\n');
    const tableLines = [];
    let startIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === match.trim()) {
        startIndex = i;
        break;
      }
    }
    
    if (startIndex === -1) return match;
    
    // Collect table lines
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        tableLines.push(line);
      } else if (tableLines.length > 0) {
        break;
      }
    }
    
    if (tableLines.length < 2) return match;
    
    const headerLine = tableLines[0];
    const separatorLine = tableLines[1];
    const dataLines = tableLines.slice(2);
    
    if (!separatorLine.includes('---')) return match;
    
    const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
    const rows = dataLines.map(line => 
      line.split('|').map(cell => cell.trim()).filter(cell => cell)
    );
    
    const headerCells = headers.map(h => 
      `<th class="text-left py-3 px-4 font-semibold text-foreground bg-muted/30 first:rounded-tl-lg last:rounded-tr-lg border-b border-border">${h}</th>`
    ).join('');
    
    const bodyCells = rows.map((row, index) => 
      `<tr class="border-b border-border/30 hover:bg-muted/20 transition-colors ${index === rows.length - 1 ? 'last:border-b-0' : ''}">
        ${row.map((cell, cellIndex) => `<td class="py-3 px-4 text-muted-foreground ${cellIndex === 0 ? 'font-medium text-foreground' : ''}">${cell}</td>`).join('')}
      </tr>`
    ).join('');
    
    return `<div class="overflow-x-auto mb-6">
      <div class="bg-card border border-border rounded-lg shadow-sm">
        <table class="w-full">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${bodyCells}</tbody>
        </table>
      </div>
    </div>`;
  });

  // Enhanced markdown parsing with reduced spacing and modern styling
  let html = cleanContent
    // Handle headers with minimal spacing and clean typography
    .replace(/### (.*)/g, '<h4 class="font-poppins text-lg font-semibold text-foreground mb-2 mt-3">$1</h4>')
    .replace(/## (.*)/g, '<h3 class="font-poppins text-xl font-semibold text-foreground mb-2 mt-4">$1</h3>')
    .replace(/# (.*)/g, '<h2 class="font-poppins text-2xl font-bold text-foreground mb-2 mt-4">$1</h2>')
    
    // Handle lists with improved spacing
    .replace(/^\* (.*)/gm, '<li class="font-poppins text-muted-foreground leading-6 mb-1.5 flex items-start"><span class="text-green-500 mr-2 mt-1 text-sm">✓</span><span>$1</span></li>')
    .replace(/^- (.*)/gm, '<li class="font-poppins text-muted-foreground leading-6 mb-1.5 flex items-start"><span class="text-primary mr-2 mt-1 text-sm">•</span><span>$1</span></li>')
    
    // Handle emphasis
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Handle paragraphs with tight spacing
    .replace(/\n\n+/g, '</p><p class="font-poppins text-muted-foreground leading-relaxed mb-2">')
    .replace(/\n/g, '<br>');

  // Wrap lists properly with improved spacing  
  html = html.replace(/(<li.*?<\/li>(\s*<li.*?<\/li>)*)/g, '<ul class="mb-4 space-y-1.5">$1</ul>');
  
  // Ensure content starts with a paragraph tag
  if (!html.startsWith('<')) {
    html = `<p class="font-poppins text-muted-foreground leading-relaxed mb-2">${html}</p>`;
  } else {
    html = `<div class="font-poppins text-muted-foreground leading-relaxed">${html}</div>`;
  }
  
  return (
    <div 
      className="markdown-content prose prose-sm max-w-none [&>*]:mb-2 [&>h2]:mt-3 [&>h3]:mt-3 [&>h4]:mt-2 [&>ul]:mb-2 [&>div]:mb-3 animate-fade-in" 
      dangerouslySetInnerHTML={{ 
        __html: html
      }} 
    />
  );
};
