import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  X, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { JobCard } from '../components/jobs/JobCard';
import { useApp } from '../context/AppContext';
import { JobCategory, EmploymentType } from '../types';

export const JobsPage: React.FC = () => {
  const { jobs } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query params or local state
  const initialCat = searchParams.get('category') || 'All Jobs';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [selectedJobType, setSelectedJobType] = useState<string>('All Types');
  const [workModeFilter, setWorkModeFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'salary'>('latest');

  // Static/dynamic categories matching Screen 3
  const categoryCounts: { name: string; count: number }[] = [
    { name: 'All Jobs', count: 43 },
    { name: 'IT & Software', count: 18 },
    { name: 'Engineering', count: 15 },
    { name: 'Healthcare', count: 4 },
    { name: 'Sales & Marketing', count: 7 },
    { name: 'Finance & Accounts', count: 6 },
    { name: 'HR & Admin', count: 3 },
    { name: 'Others', count: 2 }
  ];

  const locations = [
    'All Locations',
    'Bangalore, India',
    'Hyderabad, India',
    'Chennai, India',
    'Mumbai, India',
    'Pune, India',
    'Delhi NCR, India',
    'Remote'
  ];

  const jobTypes = [
    'All Types',
    'Full Time',
    'Part Time',
    'Contract',
    'Temporary'
  ];

  // Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Category filter
      if (selectedCategory !== 'All Jobs' && job.category !== selectedCategory) {
        return false;
      }
      // Location filter
      if (selectedLocation !== 'All Locations' && !job.location.toLowerCase().includes(selectedLocation.split(',')[0].toLowerCase())) {
        return false;
      }
      // Job Type filter
      if (selectedJobType !== 'All Types' && job.employmentType !== selectedJobType) {
        return false;
      }
      // Work mode
      if (workModeFilter !== 'All' && job.workMode !== workModeFilter) {
        return false;
      }
      // Keyword search
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(query);
        const matchCompany = job.company.toLowerCase().includes(query);
        const matchSkills = job.skills.some(s => s.toLowerCase().includes(query));
        const matchLoc = job.location.toLowerCase().includes(query);
        if (!matchTitle && !matchCompany && !matchSkills && !matchLoc) {
          return false;
        }
      }
      return true;
    });
  }, [jobs, selectedCategory, selectedLocation, selectedJobType, workModeFilter, searchKeyword]);

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setSearchParams(catName === 'All Jobs' ? {} : { category: catName });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All Jobs');
    setSearchKeyword('');
    setSelectedLocation('All Locations');
    setSelectedJobType('All Types');
    setWorkModeFilter('All');
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20">
      
      {/* Header Breadcrumb */}
      <Breadcrumb
        items={[{ label: 'Jobs' }]}
        title="Jobs / Vacancies"
        subtitle="Explore active openings and connect with India's leading corporate and industrial employers."
        bannerImage="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
        badge="Career Marketplace"
      />

      {/* =========================================================================
          TOP SEARCH BAR (Matches Screen 3)
          Search Job Title / Keyword | Location | Job Type | [Search]
          ========================================================================= */}
      <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-200">
          <form 
            onSubmit={e => e.preventDefault()}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
          >
            {/* Input 1: Search Keyword */}
            <div className="lg:col-span-4 relative">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Search Job Title / Keyword
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  placeholder="e.g. Accountant, Developer, Engineer..."
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-[#FF6B00] outline-none"
                />
              </div>
            </div>

            {/* Input 2: Location */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-[#FF6B00] outline-none bg-white appearance-none cursor-pointer"
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input 3: Job Type */}
            <div className="lg:col-span-3">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Job Type
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <select
                  value={selectedJobType}
                  onChange={e => setSelectedJobType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 focus:border-[#FF6B00] outline-none bg-white appearance-none cursor-pointer"
                >
                  {jobTypes.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Orange Search CTA Button */}
            <div className="lg:col-span-2 pt-4 sm:pt-5">
              <button
                type="submit"
                id="job-search-submit-btn"
                className="w-full py-2.5 rounded-lg bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" /> Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
          TWO COLUMN CONTENT AREA (Matches Screen 3)
          Left: Job Categories with real counts
          Right: Featured Jobs list
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Job Categories (Matches Screen 3 sidebar) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#FF6B00]" /> Job Categories
                </h3>
                {(selectedCategory !== 'All Jobs' || searchKeyword || selectedLocation !== 'All Locations') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-[#FF6B00] hover:underline font-semibold"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-1">
                {categoryCounts.map((cat, idx) => {
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        isSelected 
                          ? 'bg-[#071A2D] text-white' 
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Filter: Work Mode */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm text-xs">
              <h4 className="font-bold text-slate-900 mb-3">Work Mode</h4>
              <div className="space-y-2">
                {['All', 'On-site', 'Hybrid', 'Remote'].map(mode => (
                  <label key={mode} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="workMode" 
                      checked={workModeFilter === mode} 
                      onChange={() => setWorkModeFilter(mode)}
                      className="accent-[#FF6B00]"
                    />
                    <span className="text-slate-700">{mode}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Resume Submit Banner */}
            <div className="bg-[#071A2D] text-white rounded-xl p-5 border border-slate-800">
              <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider">Fast Track</span>
              <h4 className="text-base font-bold mt-1">Can't Find Your Match?</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Upload your CV to our candidate database and let Fortune 500 companies discover your profile directly.
              </p>
              <a
                href="/candidates/register"
                className="mt-4 block w-full py-2 bg-[#FF6B00] text-center font-bold text-xs rounded-lg hover:bg-[#E05E00] transition-colors"
              >
                Upload Resume
              </a>
            </div>

          </div>

          {/* Right Main Content: Featured Jobs List */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Top results header */}
            <div className="bg-white rounded-xl border border-slate-200/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  Current Job Openings
                  <span className="text-xs font-normal text-slate-500">
                    ({filteredJobs.length} openings found)
                  </span>
                </h2>
                {selectedCategory !== 'All Jobs' && (
                  <span className="inline-flex items-center gap-1 text-xs text-[#FF6B00] font-semibold mt-0.5">
                    Category: {selectedCategory}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setSelectedCategory('All Jobs')} 
                    />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'latest' | 'salary')}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold bg-white outline-none"
                >
                  <option value="latest">Recently Added</option>
                  <option value="salary">Highest CTC</option>
                </select>
              </div>
            </div>

            {/* List of Job Cards */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">No matching jobs found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try relaxing your keyword filters or clearing category selections to explore more vacancies.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
