import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Ananya Reddy",
    role: "CSE Student, JNTU Hyderabad",
    text: "InternPath matched me with a React internship at a startup I'd never have found on my own. The AI score told me exactly why I was a strong fit — I got selected in the first round.",
    score: "94% Match",
    scoreColor: "bg-green-50 text-green-700",
  },
  {
    name: "Karan Mehta",
    role: "IT Student, VIT Vellore",
    text: "I applied to 6 internships in a week. The application tracking showed me exactly where I stood at every stage. Got shortlisted at 4 of them — InternPath made the process much less stressful.",
    score: "87% Match",
    scoreColor: "bg-green-50 text-green-700",
  },
  {
    name: "Priya Nair",
    role: "ECE Student, NIT Trichy",
    text: "As a non-CS student, I was worried I'd be filtered out. InternPath's AI matched my embedded systems skills to the right roles and I landed my first internship offer within 2 weeks.",
    score: "81% Match",
    scoreColor: "bg-blue-50 text-blue-700",
  },
  {
    name: "Rohit Sharma",
    role: "HR Lead, TechNova Startups",
    text: "We posted an internship and had 40 applicants ranked by AI match score within 24 hours. The shortlisting that would have taken us 3 days took 2 hours. Genuinely impressive.",
    score: "Recruiter",
    scoreColor: "bg-purple-50 text-purple-700",
  },
  {
    name: "Sneha Iyer",
    role: "Data Science Student, BITS Pilani",
    text: "The match score breakdown showed exactly which of my skills aligned with each role. I used it to prioritize applications and ended up with a Python data internship at a product company.",
    score: "90% Match",
    scoreColor: "bg-green-50 text-green-700",
  },
  {
    name: "Arjun Patel",
    role: "Tech Recruiter, FinEdge Solutions",
    text: "InternPath's recruiter dashboard is clean and fast. The candidate scoring means we're only spending time on people who actually fit the role. Our offer acceptance rate went up significantly.",
    score: "Recruiter",
    scoreColor: "bg-purple-50 text-purple-700",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight text-primary">
            Loved by Students & Recruiters
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            See how InternPath is helping students land internships and
            recruiters find the right candidates faster.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white border border-border rounded-[28px] p-6 flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <Stars />
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${t.scoreColor}`}>
                  {t.score}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted leading-6 flex-1">"{t.text}"</p>
              <div className="mt-5 pt-4 border-t border-border">
                <p className="text-sm font-semibold text-primary">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default TestimonialsSection;