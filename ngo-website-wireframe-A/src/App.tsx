/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Heart,
  Users,
  BarChart3,
  BookOpen,
  Quote,
  Megaphone,
  Calendar,
  Mail,
  Share2,
  Download,
  Eye,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  X,
  Check,
  MoveUp,
  MoveDown,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  CreditCard,
  Building,
  Clock,
  Send,
  AlertCircle
} from 'lucide-react';

// --- Types ---
export interface NGOSection {
  id: string;
  name: string;
  category: string;
  purpose: string;
  iconName: string;
  enabled: boolean;
  wireframeSpec: string;
}

export interface Campaign {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  raised: number;
  goal: number;
  donorsCount: number;
  description: string;
  urgent: boolean;
}

export interface Story {
  id: string;
  title: string;
  beneficiary: string;
  location: string;
  tag: string;
  image: string;
  excerpt: string;
  fullStory: string;
  date: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  description: string;
}

// --- Initial Data ---
const INITIAL_SECTIONS: NGOSection[] = [
  {
    id: 'donation',
    name: 'Donation & Impact Support',
    category: 'Fundraising',
    purpose: 'Prominent, friction-free interface for one-time and monthly contributions with transparent fund allocation breakdowns.',
    iconName: 'Heart',
    enabled: true,
    wireframeSpec: 'Hero contribution module, preset amount selectors ($25-$250), tax receipt calculation, monthly toggle.'
  },
  {
    id: 'impact',
    name: 'Impact Showcase',
    category: 'Transparency',
    purpose: 'Audited impact metrics, reach metrics, and programmatic achievements to establish donor trust and organizational credibility.',
    iconName: 'BarChart3',
    enabled: true,
    wireframeSpec: '4-column key metric grid, live reach counters, audited financial allocation pie-chart representation.'
  },
  {
    id: 'campaigns',
    name: 'Campaign Highlights',
    category: 'Programs',
    purpose: 'Interactive showcase of active emergency relief and ongoing development initiatives with progress tracking.',
    iconName: 'Megaphone',
    enabled: true,
    wireframeSpec: 'Filtered campaign cards with real-time progress bars, budget targets, and instant support action buttons.'
  },
  {
    id: 'volunteer',
    name: 'Volunteer Registration Form',
    category: 'Community',
    purpose: 'Seamless onboarding portal for volunteers to submit skill sets, availability, and preferred field locations.',
    iconName: 'Users',
    enabled: true,
    wireframeSpec: 'Multi-step registration form with skill tags, availability matrix, and automated submission confirmation.'
  },
  {
    id: 'stories',
    name: 'Success Stories',
    category: 'Narratives',
    purpose: 'Human-centric beneficiary case studies documenting verified long-term outcomes and field transformations.',
    iconName: 'BookOpen',
    enabled: true,
    wireframeSpec: 'Featured narrative cards with photo journalism, quote callouts, and expandable full-story reader drawers.'
  },
  {
    id: 'events',
    name: 'Event Updates & Gatherings',
    category: 'Activities',
    purpose: 'Calendar of upcoming charity drives, webinars, and field volunteer meetups with instant RSVP capabilities.',
    iconName: 'Calendar',
    enabled: true,
    wireframeSpec: 'Chronological event list with live seat counts, calendar sync buttons, and RSVP modal triggers.'
  },
  {
    id: 'testimonials',
    name: 'Community & Partner Testimonials',
    category: 'Social Proof',
    purpose: 'Verified quotes from community leaders, corporate sponsors, and ground volunteers validating field performance.',
    iconName: 'Quote',
    enabled: true,
    wireframeSpec: 'Curated quote carousel with verified stakeholder tags, role badges, and partner organization logos.'
  },
  {
    id: 'social',
    name: 'Social Media & Awareness Feed',
    category: 'Outreach',
    purpose: 'Live social engagement widget connecting site visitors to official campaign posts and direct sharing tools.',
    iconName: 'Share2',
    enabled: true,
    wireframeSpec: 'Live feed preview grid, social network quick-links, and one-click campaign sharing dialogs.'
  },
  {
    id: 'contact',
    name: 'Contact & Headquarters Hub',
    category: 'Operations',
    purpose: 'Direct contact channels for institutional partners, press inquiries, and local field office locations.',
    iconName: 'Mail',
    enabled: true,
    wireframeSpec: 'Split contact interface with department routing, interactive contact form, and HQ location maps.'
  }
];

const CAMPAIGNS_DATA: Campaign[] = [
  {
    id: 'camp-1',
    title: 'Clean Drinking Water Well Infrastructure',
    category: 'Water & Sanitation',
    location: 'Turkana County, Kenya',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?q=80&w=800&auto=format&fit=crop',
    raised: 42500,
    goal: 50000,
    donorsCount: 382,
    description: 'Constructing solar-powered borehole wells to provide safe, clean drinking water to over 12,000 villagers and 3 primary schools.',
    urgent: true
  },
  {
    id: 'camp-2',
    title: 'Emergency Mobile Healthcare Unit',
    category: 'Healthcare',
    location: 'Rural Bihar, India',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    raised: 19800,
    goal: 28000,
    donorsCount: 194,
    description: 'Equipping a custom all-terrain van with diagnostic gear and essential medicines to serve remote health clinics weekly.',
    urgent: false
  },
  {
    id: 'camp-3',
    title: 'Youth Digital Literacy & Laptop Drive',
    category: 'Education',
    location: 'Medellín, Colombia',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    raised: 31200,
    goal: 35000,
    donorsCount: 265,
    description: 'Providing refurbished laptops, high-speed internet, and coding instruction to 450 underserved high school students.',
    urgent: false
  }
];

const STORIES_DATA: Story[] = [
  {
    id: 'story-1',
    title: 'From Water Scarcity to First-Generation University Graduate',
    beneficiary: 'Amina Cherono',
    location: 'Eldoret, Kenya',
    tag: 'Education & Empowerment',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop',
    date: 'July 2026',
    excerpt: 'Before the community water well was built, Amina walked 8 kilometers daily. Today she holds a degree in Agricultural Engineering.',
    fullStory: 'Growing up in rural Eldoret, Amina spent up to four hours every morning fetching water for her family, frequently missing school during dry seasons. When Hope Horizon installed a deep-borehole well in 2021, Amina was able to attend school consistently. Supported by our higher-education scholarship fund, she graduated at the top of her class in Agricultural Engineering and now manages regional irrigation projects.'
  },
  {
    id: 'story-2',
    title: 'How a Mobile Medical Unit Saved 300+ Infants in Harvest Season',
    beneficiary: 'Dr. Rahul Sharma & Village Mothers',
    location: 'Bihar, India',
    tag: 'Healthcare & Nutrition',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    date: 'June 2026',
    excerpt: 'With nearest hospitals over two hours away, our mobile health team provided critical neonatal checkups directly at village doorsteps.',
    fullStory: 'During monsoon seasons, unpaved roads in northern Bihar become impassable for standard ambulances. Our customized all-terrain mobile clinic delivered vaccines, prenatal nutrition, and emergency telemedicine to over 1,400 families across 18 isolated hamlets this year alone.'
  }
];

const EVENTS_DATA: EventItem[] = [
  {
    id: 'event-1',
    title: 'Global Water Relief & Field Report Webinar',
    date: 'Aug 18, 2026',
    time: '10:00 AM - 11:30 AM EST',
    location: 'Online via Zoom',
    type: 'Virtual Briefing',
    attendees: 142,
    description: 'Join our East Africa regional director for a live field report and Q&A on upcoming clean water borehole installations.'
  },
  {
    id: 'event-2',
    title: 'Annual Community Volunteer Orientation & Drive',
    date: 'Sep 05, 2026',
    time: '09:00 AM - 02:00 PM',
    location: 'Metropolitan Civic Center, NY',
    type: 'In-Person Workshop',
    attendees: 88,
    description: 'Hands-on training session for new logistics, health education, and youth tutoring volunteers.'
  }
];

export default function App() {
  // --- States ---
  const [sections, setSections] = useState<NGOSection[]>(INITIAL_SECTIONS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(CAMPAIGNS_DATA);
  const [stories] = useState<Story[]>(STORIES_DATA);
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);

  // View Controls
  const [viewMode, setViewMode] = useState<'visual' | 'wireframe' | 'structure_editor'>('visual');
  const [showStructurePrompt, setShowStructurePrompt] = useState<boolean>(true);

  // Interactivity States
  const [donationFrequency, setDonationFrequency] = useState<'monthly' | 'once'>('monthly');
  const [selectedDonationPreset, setSelectedDonationPreset] = useState<number>(50);
  const [customDonationAmount, setCustomDonationAmount] = useState<string>('');
  const [selectedCampaignForDonation, setSelectedCampaignForDonation] = useState<Campaign | null>(null);

  // Modals & Drawers
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [donationStep, setDonationStep] = useState<'amount' | 'details' | 'success'>('amount');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');

  const [activeStoryModal, setActiveStoryModal] = useState<Story | null>(null);
  const [activeEventRsvp, setActiveEventRsvp] = useState<EventItem | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);

  // Volunteer Form State
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Field Outreach & Logistics',
    availability: 'Weekends (5-10 hrs/week)',
    notes: ''
  });
  const [volunteerSubmitted, setVolunteerSubmitted] = useState<boolean>(false);
  const [volunteerCount, setVolunteerCount] = useState<number>(1240);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Section Toggle & Reordering
  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[newIndex];
    updated[newIndex] = temp;
    setSections(updated);
  };

  // Smooth Navigation
  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      showToast(`Navigated to section: ${id}`);
    }
  };

  // Donation Submit Handler
  const handleCompleteDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customDonationAmount ? parseFloat(customDonationAmount) : selectedDonationPreset;
    if (!finalAmount || finalAmount <= 0) {
      showToast('Please enter a valid donation amount.');
      return;
    }

    if (selectedCampaignForDonation) {
      setCampaigns(prev =>
        prev.map(c =>
          c.id === selectedCampaignForDonation.id
            ? { ...c, raised: c.raised + finalAmount, donorsCount: c.donorsCount + 1 }
            : c
        )
      );
    }

    setDonationStep('success');
    showToast(`Thank you, ${donorName || 'Generous Donor'}! Your $${finalAmount} contribution was processed.`);
  };

  // Volunteer Submission Handler
  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerForm.name || !volunteerForm.email) {
      showToast('Please provide your name and email address.');
      return;
    }
    setVolunteerSubmitted(true);
    setVolunteerCount(prev => prev + 1);
    showToast(`Welcome aboard, ${volunteerForm.name}! Your volunteer application has been received.`);
  };

  // Event RSVP Handler
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeEventRsvp) {
      setEvents(prev =>
        prev.map(ev => (ev.id === activeEventRsvp.id ? { ...ev, attendees: ev.attendees + 1 } : ev))
      );
    }
    setRsvpSubmitted(true);
    showToast('Your RSVP is confirmed! Check your email for calendar invite.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-200">
      {/* Toast Notification Floating Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Senior Designer / Executive Header Control Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-700 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
              <Heart className="w-5 h-5 fill-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 tracking-tight">Hope Horizon NGO</h1>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Interactive Layout
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Professional Website Wireframe & Live Functional Showcase
              </p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1 text-xs font-medium">
              <button
                id="btn-mode-visual"
                onClick={() => setViewMode('visual')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'visual'
                    ? 'bg-white text-emerald-800 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5 inline mr-1.5" /> Live Preview
              </button>
              <button
                id="btn-mode-wireframe"
                onClick={() => setViewMode('wireframe')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'wireframe'
                    ? 'bg-white text-emerald-800 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 inline mr-1.5" /> Wireframe Specs
              </button>
              <button
                id="btn-mode-structure"
                onClick={() => setViewMode('structure_editor')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'structure_editor'
                    ? 'bg-white text-emerald-800 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 inline mr-1.5" /> Structure Consultation
              </button>
            </div>

            <button
              id="btn-export"
              onClick={() => {
                window.print();
                showToast('Preparing document export...');
              }}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Export PDF / Wireframe
            </button>
          </div>
        </div>
      </header>

      {/* Structure Confirmation / Consultation Banner */}
      {showStructurePrompt && viewMode !== 'structure_editor' && (
        <div className="bg-emerald-900 text-white px-4 py-3 border-b border-emerald-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-emerald-800 rounded-lg shrink-0">
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </span>
              <p>
                <strong className="font-semibold text-emerald-200">Page Structure Consultation:</strong> You requested to review and confirm the section sequence. All 9 core sections are live below. You can toggle or reorder them at any time.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setViewMode('structure_editor')}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all"
              >
                Customize Section Sequence →
              </button>
              <button
                onClick={() => setShowStructurePrompt(false)}
                className="text-emerald-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- VIEW MODE 1: STRUCTURE CONSULTATION & REORDER EDITOR --- */}
        {viewMode === 'structure_editor' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    NGO Website Structure & Sequence Designer
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select which sections to include on your homepage and adjust their vertical sequence.
                  </p>
                </div>
                <button
                  onClick={() => setViewMode('visual')}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-2"
                >
                  Apply & Return to Live Preview <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                {sections.map((sec, index) => (
                  <div
                    key={sec.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      sec.enabled
                        ? 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-slate-400">
                        <button
                          disabled={index === 0}
                          onClick={() => moveSection(index, 'up')}
                          className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                          title="Move Up"
                        >
                          <MoveUp className="w-4 h-4" />
                        </button>
                        <button
                          disabled={index === sections.length - 1}
                          onClick={() => moveSection(index, 'down')}
                          className="p-1 hover:bg-slate-100 rounded disabled:opacity-30"
                          title="Move Down"
                        >
                          <MoveDown className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        0{index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900">{sec.name}</h3>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {sec.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{sec.purpose}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sec.enabled}
                          onChange={() => toggleSection(sec.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        <span className="ml-2 text-xs font-semibold text-slate-700">
                          {sec.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW MODE 2 & 3: LIVE VISUAL & WIREFRAME LAYOUT --- */}
        {viewMode !== 'structure_editor' && (
          <div className="space-y-10">
            {/* Real-time Interactive Primary Navigation Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1 md:gap-2 text-xs font-semibold text-slate-700">
                <span className="text-slate-400 text-[10px] uppercase tracking-wider mr-2 font-bold">Quick Jump:</span>
                {sections
                  .filter(s => s.enabled)
                  .map(s => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 transition-all border border-slate-100"
                    >
                      {s.name}
                    </button>
                  ))}
              </div>

              <button
                onClick={() => {
                  setSelectedCampaignForDonation(null);
                  setIsDonationModalOpen(true);
                  setDonationStep('amount');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 fill-white" /> Quick Donate
              </button>
            </div>

            {/* HERO / MISSION OVERVIEW BANNER */}
            <section className={`rounded-3xl p-8 md:p-14 relative overflow-hidden transition-all ${
              viewMode === 'wireframe'
                ? 'bg-slate-100 border-2 border-dashed border-slate-400 text-slate-800 font-mono'
                : 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-xl'
            }`}>
              <div className="max-w-3xl space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>501(c)(3) Non-Profit Organization • Tax Deductible</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  {viewMode === 'wireframe'
                    ? '[WIRE-SPEC: Primary Hero Headline — Purpose-Driven Community Relief]'
                    : 'Empowering Underserved Communities Through Sustainable Action'}
                </h1>

                <p className={`text-sm md:text-base leading-relaxed ${viewMode === 'wireframe' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {viewMode === 'wireframe'
                    ? '[WIRE-SPEC: Narrative description of NGO mission, clean water, healthcare, and education verticals]'
                    : 'Hope Horizon works on the front lines of global poverty, bringing clean water, emergency medicine, and youth education to over 50,000 families annually.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedCampaignForDonation(null);
                      setIsDonationModalOpen(true);
                      setDonationStep('amount');
                    }}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-slate-950" /> Support Our Mission
                  </button>
                  <button
                    onClick={() => scrollToSection('volunteer')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" /> Become a Volunteer
                  </button>
                </div>
              </div>

              {/* Background Accent */}
              {viewMode !== 'wireframe' && (
                <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden lg:block bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop')` }} />
              )}
            </section>

            {/* SECTIONS LISTING */}
            {sections.filter(s => s.enabled).map(section => {
              // SECTION 1: DONATION
              if (section.id === 'donation') {
                return (
                  <section
                    key={section.id}
                    id="section-donation"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-white border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                          {viewMode === 'wireframe' ? '[WIRE-SECTION 01]' : 'Direct Impact'}
                        </span>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-1">
                          {section.name}
                        </h2>
                      </div>
                      <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                        <Heart className="w-5 h-5" />
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-5 space-y-4">
                        <h3 className="text-lg font-bold text-slate-900">
                          Every Dollar Directly Funds Field Operations
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          We operate with 98.2% financial efficiency. Your donation provides clean water infrastructure, emergency health kits, and youth school supplies.
                        </p>

                        <div className="space-y-2 pt-2">
                          {[
                            { title: '$25 Donation', desc: 'Provides clean drinking water for a child for 1 year' },
                            { title: '$50 Donation', desc: 'Supplies 1 month of emergency medicine to a rural clinic' },
                            { title: '$100 Donation', desc: 'Funds complete school supplies & meals for 5 students' }
                          ].map((item, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                                <p className="text-[11px] text-slate-500">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-7 bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                          <h4 className="font-bold text-sm">Select Contribution Amount</h4>
                          <div className="flex bg-slate-800 p-1 rounded-lg text-xs font-semibold">
                            <button
                              onClick={() => setDonationFrequency('monthly')}
                              className={`px-3 py-1 rounded-md transition-all ${
                                donationFrequency === 'monthly' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                              }`}
                            >
                              Monthly Giving
                            </button>
                            <button
                              onClick={() => setDonationFrequency('once')}
                              className={`px-3 py-1 rounded-md transition-all ${
                                donationFrequency === 'once' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                              }`}
                            >
                              One-Time
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          {[25, 50, 100, 250].map(amt => (
                            <button
                              key={amt}
                              onClick={() => {
                                setSelectedDonationPreset(amt);
                                setCustomDonationAmount('');
                              }}
                              className={`py-3 rounded-xl font-extrabold text-sm transition-all border ${
                                selectedDonationPreset === amt && !customDonationAmount
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                              }`}
                            >
                              ${amt}
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300 block mb-1.5">Or Enter Custom Amount ($ USD)</label>
                          <input
                            type="number"
                            placeholder="e.g. 500"
                            value={customDonationAmount}
                            onChange={e => {
                              setCustomDonationAmount(e.target.value);
                            }}
                            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>

                        <button
                          onClick={() => {
                            setSelectedCampaignForDonation(null);
                            setIsDonationModalOpen(true);
                            setDonationStep('details');
                          }}
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          Proceed to Secure Donation (${customDonationAmount || selectedDonationPreset} {donationFrequency})
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SSL Encrypted • Instant Tax Receipt Generated
                        </p>
                      </div>
                    </div>
                  </section>
                );
              }

              // SECTION 2: IMPACT SHOWCASE
              if (section.id === 'impact') {
                return (
                  <section
                    key={section.id}
                    id="section-impact"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-slate-900 text-white border-slate-800 shadow-xl'
                    }`}
                  >
                    <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                        {viewMode === 'wireframe' ? '[WIRE-SECTION 02]' : 'Audited Field Results'}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-extrabold">{section.name}</h2>
                      <p className="text-xs text-slate-400">
                        Transparent reporting on how every contribution translates into real-world impact.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-center">
                      {[
                        { num: '52,400+', label: 'Lives Directly Touched', sub: 'Across 14 underserved regions' },
                        { num: '$3.82M', label: 'Program Funds Deployed', sub: 'Direct field aid & equipment' },
                        { num: '142', label: 'Schools & Clinics Built', sub: 'Long-term community infrastructure' },
                        { num: '98.2%', label: 'Efficiency Ratio', sub: 'Audited by independent partner' }
                      ].map((stat, idx) => (
                        <div key={idx} className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/60 shadow-sm">
                          <div className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tight">{stat.num}</div>
                          <div className="text-xs font-bold text-white mt-2">{stat.label}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{stat.sub}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              // SECTION 3: CAMPAIGNS
              if (section.id === 'campaigns') {
                return (
                  <section
                    key={section.id}
                    id="section-campaigns"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-white border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                          {viewMode === 'wireframe' ? '[WIRE-SECTION 03]' : 'Active Initiatives'}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-1">{section.name}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Showing {campaigns.length} active campaigns</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {campaigns.map(camp => {
                        const percent = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
                        return (
                          <div
                            key={camp.id}
                            className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition-all shadow-xs"
                          >
                            <div>
                              <div className="h-44 bg-slate-200 relative overflow-hidden">
                                <img
                                  src={camp.image}
                                  alt={camp.title}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-900/80 text-white rounded-md backdrop-blur-xs">
                                  {camp.category}
                                </span>
                                {camp.urgent && (
                                  <span className="absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 bg-rose-600 text-white rounded-md shadow-xs">
                                    Urgent Need
                                  </span>
                                )}
                              </div>

                              <div className="p-5 space-y-3">
                                <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400" /> {camp.location}
                                </span>
                                <h3 className="font-bold text-slate-900 text-sm leading-snug">{camp.title}</h3>
                                <p className="text-xs text-slate-600 line-clamp-2">{camp.description}</p>

                                <div className="space-y-1.5 pt-2">
                                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                                  </div>
                                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                                    <span>Raised: ${camp.raised.toLocaleString()}</span>
                                    <span className="text-slate-500">{percent}% of ${camp.goal.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="p-5 pt-0">
                              <button
                                onClick={() => {
                                  setSelectedCampaignForDonation(camp);
                                  setIsDonationModalOpen(true);
                                  setDonationStep('amount');
                                }}
                                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5"
                              >
                                <Heart className="w-3.5 h-3.5 fill-white" /> Support This Campaign
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              }

              // SECTION 4: VOLUNTEER REGISTRATION
              if (section.id === 'volunteer') {
                return (
                  <section
                    key={section.id}
                    id="section-volunteer"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-emerald-950 text-white border-emerald-900 shadow-xl'
                    }`}
                  >
                    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          {viewMode === 'wireframe' ? '[WIRE-SECTION 04]' : 'Ground Action'}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-extrabold leading-tight">
                          {section.name}
                        </h2>
                        <p className="text-xs text-emerald-100/80 leading-relaxed">
                          Join our community of over {volunteerCount.toLocaleString()} active volunteers working across field logistics, healthcare drives, and youth education.
                        </p>

                        <div className="pt-2 space-y-2 text-xs text-emerald-200">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Flexible scheduling (Remote or On-site)
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified field training & certificate provided
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-7 bg-white text-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl">
                        {volunteerSubmitted ? (
                          <div className="text-center py-8 space-y-3">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto font-bold">
                              <Check className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Application Received!</h3>
                            <p className="text-xs text-slate-600 max-w-sm mx-auto">
                              Thank you, <strong>{volunteerForm.name}</strong>. Our volunteer coordinator will reach out to <strong>{volunteerForm.email}</strong> within 24 hours.
                            </p>
                            <button
                              onClick={() => setVolunteerSubmitted(false)}
                              className="text-xs text-emerald-700 font-bold hover:underline"
                            >
                              Submit Another Volunteer Request
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                            <h3 className="font-bold text-slate-900 text-sm">Volunteer Application Form</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                                <input
                                  type="text"
                                  required
                                  value={volunteerForm.name}
                                  onChange={e => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                                  placeholder="e.g. Sarah Jenkins"
                                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                                <input
                                  type="email"
                                  required
                                  value={volunteerForm.email}
                                  onChange={e => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                                  placeholder="sarah@example.com"
                                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Field Role</label>
                                <select
                                  value={volunteerForm.role}
                                  onChange={e => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                                >
                                  <option>Field Outreach & Logistics</option>
                                  <option>Healthcare & Medical Assistance</option>
                                  <option>Youth Tutoring & Teaching</option>
                                  <option>Media, Content & Socials</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-slate-700 block mb-1">Weekly Availability</label>
                                <select
                                  value={volunteerForm.availability}
                                  onChange={e => setVolunteerForm({ ...volunteerForm, availability: e.target.value })}
                                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                                >
                                  <option>Weekends (5-10 hrs/week)</option>
                                  <option>Weekdays (Flexible)</option>
                                  <option>Full-time / On-call Emergency</option>
                                </select>
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                            >
                              Submit Application <Send className="w-3.5 h-3.5" />
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </section>
                );
              }

              // SECTION 5: SUCCESS STORIES
              if (section.id === 'stories') {
                return (
                  <section
                    key={section.id}
                    id="section-stories"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-white border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                          {viewMode === 'wireframe' ? '[WIRE-SECTION 05]' : 'Verified Impact'}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-1">{section.name}</h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {stories.map(st => (
                        <div
                          key={st.id}
                          className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-rose-300 transition-all shadow-xs"
                        >
                          <div className="space-y-3">
                            <div className="h-48 bg-slate-200 rounded-xl overflow-hidden relative">
                              <img
                                src={st.image}
                                alt={st.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2.5 py-1 bg-slate-900/80 text-white rounded-md backdrop-blur-xs">
                                {st.tag}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span className="font-semibold text-slate-800">{st.beneficiary}</span>
                              <span>{st.location}</span>
                            </div>

                            <h3 className="font-bold text-slate-900 text-sm leading-snug">{st.title}</h3>
                            <p className="text-xs text-slate-600 line-clamp-3">{st.excerpt}</p>
                          </div>

                          <div className="pt-4 mt-2 border-t border-slate-200/60">
                            <button
                              onClick={() => setActiveStoryModal(st)}
                              className="text-xs font-bold text-rose-700 hover:text-rose-800 flex items-center gap-1"
                            >
                              Read Full Case Study <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              // SECTION 6: EVENTS
              if (section.id === 'events') {
                return (
                  <section
                    key={section.id}
                    id="section-events"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-white border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                          {viewMode === 'wireframe' ? '[WIRE-SECTION 06]' : 'Activities & Gatherings'}
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-1">{section.name}</h2>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {events.map(ev => (
                        <div
                          key={ev.id}
                          className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-purple-300 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-xl bg-purple-100 text-purple-900 font-extrabold flex flex-col items-center justify-center shrink-0 border border-purple-200">
                              <Calendar className="w-5 h-5 mb-0.5 text-purple-700" />
                              <span className="text-[10px] uppercase leading-tight">{ev.date.split(',')[0]}</span>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                                  {ev.type}
                                </span>
                                <span className="text-xs text-slate-500">{ev.time}</span>
                              </div>
                              <h3 className="font-bold text-sm text-slate-900">{ev.title}</h3>
                              <p className="text-xs text-slate-600 mt-1">{ev.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                            <span className="text-xs text-slate-500 font-semibold">{ev.attendees} Registered</span>
                            <button
                              onClick={() => {
                                setActiveEventRsvp(ev);
                                setRsvpSubmitted(false);
                              }}
                              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                            >
                              RSVP Now
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              // SECTION 7: TESTIMONIALS
              if (section.id === 'testimonials') {
                return (
                  <section
                    key={section.id}
                    id="section-testimonials"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-slate-50/80 border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="text-center max-w-xl mx-auto mb-8">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                        {viewMode === 'wireframe' ? '[WIRE-SECTION 07]' : 'Community Feedback'}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1">{section.name}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          quote: "Hope Horizon’s transparency in reporting every dollar gave our family complete confidence to establish a recurring monthly grant.",
                          author: "Elena Rostova",
                          role: "Monthly Benefactor"
                        },
                        {
                          quote: "Volunteering with the rural health van was one of the most rewarding medical experiences of my career.",
                          author: "Dr. Marcus Vance",
                          role: "Volunteer Physician"
                        },
                        {
                          quote: "The clean water borehole installed at our primary school increased daily attendance by over 40%.",
                          author: "Chief Omondi",
                          role: "Community Elder, Eldoret"
                        }
                      ].map((t, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                          <Quote className="w-6 h-6 text-cyan-600" />
                          <p className="text-xs text-slate-700 leading-relaxed italic">"{t.quote}"</p>
                          <div className="pt-2 border-t border-slate-100">
                            <h4 className="font-bold text-xs text-slate-900">{t.author}</h4>
                            <p className="text-[11px] text-slate-500">{t.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              }

              // SECTION 8: SOCIAL MEDIA
              if (section.id === 'social') {
                return (
                  <section
                    key={section.id}
                    id="section-social"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-50 border-dashed border-slate-400 font-mono'
                        : 'bg-white border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="text-center max-w-xl mx-auto mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                        {viewMode === 'wireframe' ? '[WIRE-SECTION 08]' : 'Stay Connected'}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 mt-1">{section.name}</h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Follow our daily ground activities and share campaign updates with your network.
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                      {[
                        { name: 'Instagram', icon: <Instagram className="w-4 h-4 text-pink-600" /> },
                        { name: 'Facebook', icon: <Facebook className="w-4 h-4 text-blue-600" /> },
                        { name: 'Twitter / X', icon: <Twitter className="w-4 h-4 text-sky-500" /> },
                        { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4 text-blue-700" /> }
                      ].map((soc, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            navigator.clipboard.writeText('https://hopehorizon-ngo.org');
                            showToast(`Copied ${soc.name} share link to clipboard!`);
                          }}
                          className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2 transition-all"
                        >
                          {soc.icon} Share on {soc.name}
                        </button>
                      ))}
                    </div>
                  </section>
                );
              }

              // SECTION 9: CONTACT & FOOTER
              if (section.id === 'contact') {
                return (
                  <section
                    key={section.id}
                    id="section-contact"
                    className={`rounded-3xl p-6 md:p-10 border transition-all ${
                      viewMode === 'wireframe'
                        ? 'bg-slate-100 border-dashed border-slate-400 font-mono'
                        : 'bg-slate-900 text-white border-slate-800 shadow-xl'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {viewMode === 'wireframe' ? '[WIRE-SECTION 09]' : 'Direct Inquiry'}
                        </span>
                        <h2 className="text-2xl font-bold text-white">{section.name}</h2>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Reach out to our global headquarters or local regional offices for partnership opportunities, media inquiries, or donation questions.
                        </p>

                        <div className="space-y-2 pt-2 text-xs text-slate-300">
                          <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> 100 Hope Way, Suite 400, New York, NY 10001</p>
                          <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-400" /> +1 (800) 555-HOPE (4673)</p>
                          <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-400" /> contact@hopehorizon-ngo.org</p>
                        </div>
                      </div>

                      <div className="lg:col-span-7 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          showToast('Your inquiry has been sent to our team.');
                        }} className="space-y-3">
                          <h3 className="font-bold text-xs text-white uppercase tracking-wider">Send Direct Message</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Your Name"
                              className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Your Email"
                              className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                          </div>
                          <textarea
                            rows={3}
                            required
                            placeholder="How can we help or collaborate?"
                            className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                          <button
                            type="submit"
                            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
                          >
                            Send Inquiry
                          </button>
                        </form>
                      </div>
                    </div>
                  </section>
                );
              }

              return null;
            })}
          </div>
        )}
      </main>

      {/* --- MODAL 1: REAL-TIME DONATION CHECKOUT MODAL --- */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative border border-slate-200 space-y-6">
            <button
              onClick={() => setIsDonationModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {donationStep === 'amount' && (
              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Online Checkout</span>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedCampaignForDonation ? `Donate to: ${selectedCampaignForDonation.title}` : 'Support Hope Horizon NGO'}
                  </h3>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-slate-700 block">Select Donation Amount</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 100, 250].map(amt => (
                      <button
                        key={amt}
                        onClick={() => setSelectedDonationPreset(amt)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          selectedDonationPreset === amt
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setDonationStep('details')}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Continue to Donor Info (${selectedDonationPreset}) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {donationStep === 'details' && (
              <form onSubmit={handleCompleteDonation} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Step 2 of 2</span>
                  <h3 className="text-lg font-bold text-slate-900">Donor Information</h3>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    placeholder="e.g. Michael Thorne"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address for Tax Receipt *</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={e => setDonorEmail(e.target.value)}
                    placeholder="michael@example.com"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Complete ${selectedDonationPreset} Donation
                  </button>
                </div>
              </form>
            )}

            {donationStep === 'success' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Donation Successful!</h3>
                <p className="text-xs text-slate-600">
                  Thank you for your generosity. A formal 501(c)(3) tax receipt has been dispatched to <strong>{donorEmail}</strong>.
                </p>
                <button
                  onClick={() => setIsDonationModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL 2: FULL STORY DETAIL READER --- */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveStoryModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">{activeStoryModal.tag}</span>
            <h3 className="text-xl font-bold text-slate-900">{activeStoryModal.title}</h3>

            <div className="h-60 bg-slate-200 rounded-2xl overflow-hidden">
              <img src={activeStoryModal.image} alt={activeStoryModal.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <p className="text-xs text-slate-700 leading-relaxed pt-2">
              {activeStoryModal.fullStory}
            </p>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveStoryModal(null)}
                className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: EVENT RSVP MODAL --- */}
      {activeEventRsvp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 space-y-4">
            <button
              onClick={() => setActiveEventRsvp(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Event Registration</span>
            <h3 className="text-lg font-bold text-slate-900">{activeEventRsvp.title}</h3>
            <p className="text-xs text-slate-500">{activeEventRsvp.date} • {activeEventRsvp.time}</p>

            {rsvpSubmitted ? (
              <div className="text-center py-4 space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-bold text-slate-900">Your seat is reserved!</p>
                <p className="text-[11px] text-slate-500">We emailed calendar details & reminder links.</p>
                <button
                  onClick={() => setActiveEventRsvp(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-700 text-white font-bold text-xs rounded-xl"
                >
                  Confirm RSVP
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
