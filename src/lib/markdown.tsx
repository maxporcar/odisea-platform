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

  // Handle DO's and DON'Ts sections as styled cards
  cleanContent = cleanContent.replace(/(?:✅\s*)?(?:DO['']?s|DOs)[\s\S]*?(?=\n#{1,3}|❌|$)/gi, (match) => {
    const lines = match.split('\n').filter(line => line.trim());
    const doItems = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && (line.includes('✓') || line.includes('✅'))) {
        const text = line.replace(/^[✓✅]\s*/, '').replace(/^-\s*/, '').trim();
        if (text) doItems.push(text);
      }
    }
    
    if (doItems.length === 0) return '';
    
    const listItems = doItems.map(item => 
      `<li class="flex items-start text-white text-base leading-relaxed">
        <span class="mr-3 mt-1 flex-shrink-0">•</span>
        <span>${item}</span>
      </li>`
    ).join('');
    
    return `<div class="bg-green-600 rounded-2xl p-6 mb-6 shadow-lg">
      <div class="flex items-center mb-4">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-bold text-2xl text-white">DOS</h3>
      </div>
      <ul class="space-y-3">${listItems}</ul>
    </div>`;
  });

  cleanContent = cleanContent.replace(/(?:❌\s*)?(?:DON['']?T['']?s|DONTs)[\s\S]*?(?=\n#{1,3}|✅|$)/gi, (match) => {
    const lines = match.split('\n').filter(line => line.trim());
    const dontItems = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line && (line.includes('✗') || line.includes('❌'))) {
        const text = line.replace(/^[✗❌]\s*/, '').replace(/^-\s*/, '').trim();
        if (text) dontItems.push(text);
      }
    }
    
    if (dontItems.length === 0) return '';
    
    const listItems = dontItems.map(item => 
      `<li class="flex items-start text-white text-base leading-relaxed">
        <span class="mr-3 mt-1 flex-shrink-0">•</span>
        <span>${item}</span>
      </li>`
    ).join('');
    
    return `<div class="bg-red-500 rounded-2xl p-6 mb-6 shadow-lg">
      <div class="flex items-center mb-4">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
          <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h3 class="font-bold text-2xl text-white">DON'TS</h3>
      </div>
      <ul class="space-y-3">${listItems}</ul>
    </div>`;
  });

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

  // Enhanced markdown parsing with consistent 1em spacing
  let html = cleanContent
    // Handle headers with consistent spacing - clean, professional look
    .replace(/### (.*)/g, '<h4 class="font-poppins text-lg font-semibold text-foreground mb-2 mt-4">$1</h4>')
    .replace(/## (.*)/g, '<h3 class="font-poppins text-xl font-semibold text-foreground mb-3 mt-5">$1</h3>')
    .replace(/# (.*)/g, '<h2 class="font-poppins text-2xl font-bold text-foreground mb-3 mt-6">$1</h2>')
    
    // Handle lists with consistent spacing
    .replace(/^\* (.*)/gm, '<li class="font-poppins text-muted-foreground leading-relaxed mb-1 flex items-start"><span class="text-green-500 mr-2 mt-1">✓</span><span>$1</span></li>')
    .replace(/^- (.*)/gm, '<li class="font-poppins text-muted-foreground leading-relaxed mb-1 flex items-start"><span class="text-primary mr-2 mt-1">•</span><span>$1</span></li>')
    
    // Handle emphasis
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Handle paragraphs with consistent spacing - avoid double paragraph tags
    .replace(/\n\n+/g, '</p><p class="font-poppins text-muted-foreground leading-relaxed mb-3">')
    .replace(/\n/g, '<br>');

  // Wrap lists properly with consistent spacing
  html = html.replace(/(<li.*?<\/li>(\s*<li.*?<\/li>)*)/g, '<ul class="mb-4 space-y-1">$1</ul>');
  
  // Ensure content starts with a paragraph tag
  if (!html.startsWith('<')) {
    html = `<p class="font-poppins text-muted-foreground leading-relaxed mb-4">${html}</p>`;
  } else {
    html = `<div class="font-poppins text-muted-foreground leading-relaxed">${html}</div>`;
  }
  
  return (
    <div 
      className="markdown-content prose prose-sm max-w-none [&>*]:mb-3 [&>h2]:mt-5 [&>h3]:mt-4 [&>h4]:mt-3 [&>ul]:mb-3 [&>div]:mb-4" 
      dangerouslySetInnerHTML={{ 
        __html: html
      }} 
    />
  );
};
