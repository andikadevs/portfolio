import { NextResponse } from 'next/server';
import portfolioData from '@/data/Portfolio.json';
import { PortfolioData } from '@/types';

export async function GET() {
  try {
    const data: PortfolioData = portfolioData;
    
    return NextResponse.json({
      success: true,
      data,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch portfolio data',
    }, { status: 500 });
  }
}
