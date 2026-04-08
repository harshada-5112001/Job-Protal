import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Plus, Trash2, Edit3, LayoutTemplate } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

type Experience = { id: string; company: string; role: string; duration: string; description: string };
type Education = { id: string; school: string; degree: string; year: string };
type Project = { id: string; name: string; description: string };

export default function ResumeBuilder() {
  const [name, setName] = useState("Rohan Patil");
  const [email, setEmail] = useState("rohan@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [location, setLocation] = useState("Pune, Maharashtra");
  const [skills, setSkills] = useState("JavaScript, React, Node.js, HTML, CSS, Git");
  
  const [experience, setExperience] = useState<Experience[]>([
    { id: "1", company: "Tech Solutions Inc.", role: "Frontend Developer", duration: "Jan 2022 - Present", description: "Developed modern web applications using React. Improved performance by 30%." }
  ]);
  const [education, setEducation] = useState<Education[]>([
    { id: "1", school: "Pune University", degree: "B.E. Computer Science", year: "2018 - 2022" }
  ]);
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "E-Commerce Dashboard", description: "A comprehensive dashboard for managing products and orders." }
  ]);

  const [template, setTemplate] = useState<"modern" | "classic" | "minimal">("modern");

  const handlePrint = () => {
    window.print();
  };

  const addExperience = () => setExperience([...experience, { id: Date.now().toString(), company: "", role: "", duration: "", description: "" }]);
  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperience(experience.map(e => e.id === id ? { ...e, [field]: value } : e));
  };
  const removeExperience = (id: string) => setExperience(experience.filter(e => e.id !== id));

  const addEducation = () => setEducation([...education, { id: Date.now().toString(), school: "", degree: "", year: "" }]);
  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(e => e.id === id ? { ...e, [field]: value } : e));
  };
  const removeEducation = (id: string) => setEducation(education.filter(e => e.id !== id));

  const addProject = () => setProjects([...projects, { id: Date.now().toString(), name: "", description: "" }]);
  const updateProject = (id: string, field: keyof Project, value: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };
  const removeProject = (id: string) => setProjects(projects.filter(p => p.id !== id));

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <div className="no-print">
        <Navbar />
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden container mx-auto">
        {/* Editor Sidebar */}
        <div className="no-print w-full lg:w-[450px] lg:border-r bg-background overflow-y-auto p-4 md:p-6 lg:h-[calc(100vh-64px)]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Resume Builder</h1>
          </div>

          <div className="space-y-8 pb-10">
            {/* Personal Details */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center border-b pb-2">
                <Edit3 className="w-4 h-4 mr-2" /> Personal Details
              </h2>
              <div className="grid gap-3">
                <div>
                  <Label>Full Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>
            </section>

            {/* Experience */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-lg font-semibold flex items-center">
                  Work Experience
                </h2>
                <Button variant="ghost" size="sm" onClick={addExperience}><Plus className="w-4 h-4" /></Button>
              </div>
              
              {experience.map((exp, index) => (
                <Card key={exp.id} className="relative">
                  <Button 
                    variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  <CardContent className="pt-4 space-y-3">
                    <Input placeholder="Company" value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} />
                    <Input placeholder="Role" value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} />
                    <Input placeholder="Duration (e.g. Jan 2020 - Present)" value={exp.duration} onChange={e => updateExperience(exp.id, 'duration', e.target.value)} />
                    <Textarea placeholder="Description" value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} rows={3} />
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Education */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-lg font-semibold flex items-center">
                  Education
                </h2>
                <Button variant="ghost" size="sm" onClick={addEducation}><Plus className="w-4 h-4" /></Button>
              </div>
              
              {education.map((edu) => (
                <Card key={edu.id} className="relative">
                  <Button 
                    variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  <CardContent className="pt-4 space-y-3">
                    <Input placeholder="School / University" value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} />
                    <Input placeholder="Degree" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} />
                    <Input placeholder="Year" value={edu.year} onChange={e => updateEducation(edu.id, 'year', e.target.value)} />
                  </CardContent>
                </Card>
              ))}
            </section>

            {/* Skills */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center border-b pb-2">
                Skills
              </h2>
              <div>
                <Label>Skills (Comma separated)</Label>
                <Textarea value={skills} onChange={e => setSkills(e.target.value)} rows={3} />
              </div>
            </section>

            {/* Projects */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h2 className="text-lg font-semibold flex items-center">
                  Projects
                </h2>
                <Button variant="ghost" size="sm" onClick={addProject}><Plus className="w-4 h-4" /></Button>
              </div>
              
              {projects.map((proj) => (
                <Card key={proj.id} className="relative">
                  <Button 
                    variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                    onClick={() => removeProject(proj.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  <CardContent className="pt-4 space-y-3">
                    <Input placeholder="Project Name" value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} />
                    <Textarea placeholder="Description" value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} rows={2} />
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="flex-1 bg-muted/30 p-4 lg:p-8 overflow-y-auto lg:h-[calc(100vh-64px)] flex flex-col items-center">
          <div className="no-print w-full max-w-[210mm] flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <LayoutTemplate className="w-5 h-5 text-muted-foreground" />
              <div className="flex bg-background rounded-lg border p-1">
                {(["modern", "classic", "minimal"] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setTemplate(t)}
                    className={`px-3 py-1 text-sm rounded-md capitalize transition-colors ${template === t ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handlePrint} className="gap-2">
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>

          {/* The Resume Document - A4 Aspect Ratio roughly */}
          <div 
            id="resume-preview" 
            className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-xl text-black"
            style={{ padding: '40px 50px' }}
          >
            {/* Modern Template */}
            {template === 'modern' && (
              <div className="font-sans">
                <div className="flex justify-between items-end border-b-2 border-primary pb-6 mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{name || "Your Name"}</h1>
                    <div className="text-gray-600 flex gap-4 text-sm font-medium">
                      <span>{email || "Email"}</span>
                      <span>•</span>
                      <span>{phone || "Phone"}</span>
                      <span>•</span>
                      <span>{location || "Location"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                  <div className="col-span-8 space-y-8">
                    {experience.length > 0 && (
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider text-primary">Experience</h2>
                        <div className="space-y-5">
                          {experience.map(exp => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-800 text-lg">{exp.role}</h3>
                                <span className="text-sm font-medium text-gray-500">{exp.duration}</span>
                              </div>
                              <div className="text-primary font-medium mb-2">{exp.company}</div>
                              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {projects.length > 0 && (
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider text-primary">Projects</h2>
                        <div className="space-y-4">
                          {projects.map(proj => (
                            <div key={proj.id}>
                              <h3 className="font-bold text-gray-800">{proj.name}</h3>
                              <p className="text-gray-700 text-sm leading-relaxed mt-1">{proj.description}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="col-span-4 space-y-8">
                    {skills && (
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider text-primary">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {skills.split(',').map((skill, i) => (
                            <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 text-xs font-medium rounded">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </section>
                    )}

                    {education.length > 0 && (
                      <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wider text-primary">Education</h2>
                        <div className="space-y-4">
                          {education.map(edu => (
                            <div key={edu.id}>
                              <h3 className="font-bold text-gray-800 text-sm">{edu.degree}</h3>
                              <div className="text-gray-600 text-sm">{edu.school}</div>
                              <div className="text-gray-500 text-xs mt-1">{edu.year}</div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Classic Template */}
            {template === 'classic' && (
              <div className="font-serif">
                <div className="text-center border-b border-gray-400 pb-6 mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-3 uppercase tracking-widest">{name || "Your Name"}</h1>
                  <div className="text-gray-600 text-sm">
                    {email} | {phone} | {location}
                  </div>
                </div>

                <div className="space-y-6">
                  {experience.length > 0 && (
                    <section>
                      <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-3 pb-1">Professional Experience</h2>
                      <div className="space-y-4">
                        {experience.map(exp => (
                          <div key={exp.id}>
                            <div className="flex justify-between font-bold text-gray-800">
                              <span>{exp.company}</span>
                              <span>{exp.duration}</span>
                            </div>
                            <div className="italic text-gray-700 mb-2">{exp.role}</div>
                            <p className="text-gray-700 text-sm">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {education.length > 0 && (
                    <section>
                      <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-3 pb-1">Education</h2>
                      <div className="space-y-3">
                        {education.map(edu => (
                          <div key={edu.id} className="flex justify-between items-baseline">
                            <div>
                              <div className="font-bold text-gray-800">{edu.school}</div>
                              <div className="italic text-gray-700 text-sm">{edu.degree}</div>
                            </div>
                            <div className="text-gray-700 text-sm">{edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {skills && (
                    <section>
                      <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
                      <p className="text-gray-800 text-sm">{skills}</p>
                    </section>
                  )}

                  {projects.length > 0 && (
                    <section>
                      <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-300 mb-3 pb-1">Projects</h2>
                      <div className="space-y-3">
                        {projects.map(proj => (
                          <div key={proj.id}>
                            <div className="font-bold text-gray-800">{proj.name}</div>
                            <p className="text-gray-700 text-sm">{proj.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            )}

            {/* Minimal Template */}
            {template === 'minimal' && (
              <div className="font-sans text-gray-800">
                <div className="mb-10">
                  <h1 className="text-3xl font-light tracking-wide mb-4">{name || "Your Name"}</h1>
                  <div className="text-xs text-gray-500 uppercase tracking-widest space-y-1">
                    <div>{email}</div>
                    <div>{phone}</div>
                    <div>{location}</div>
                  </div>
                </div>

                <div className="space-y-10">
                  {experience.length > 0 && (
                    <section className="grid grid-cols-4 gap-4">
                      <div className="col-span-1 text-xs uppercase tracking-widest text-gray-400 pt-1">Experience</div>
                      <div className="col-span-3 space-y-6">
                        {experience.map(exp => (
                          <div key={exp.id}>
                            <h3 className="font-medium text-black">{exp.role} <span className="text-gray-400 font-normal">at {exp.company}</span></h3>
                            <div className="text-xs text-gray-400 mb-2">{exp.duration}</div>
                            <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {education.length > 0 && (
                    <section className="grid grid-cols-4 gap-4">
                      <div className="col-span-1 text-xs uppercase tracking-widest text-gray-400 pt-1">Education</div>
                      <div className="col-span-3 space-y-4">
                        {education.map(edu => (
                          <div key={edu.id}>
                            <h3 className="font-medium text-black">{edu.degree}</h3>
                            <div className="text-sm text-gray-600">{edu.school}</div>
                            <div className="text-xs text-gray-400">{edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {skills && (
                    <section className="grid grid-cols-4 gap-4">
                      <div className="col-span-1 text-xs uppercase tracking-widest text-gray-400 pt-1">Skills</div>
                      <div className="col-span-3 text-sm text-gray-600 leading-relaxed">
                        {skills}
                      </div>
                    </section>
                  )}
                  
                  {projects.length > 0 && (
                    <section className="grid grid-cols-4 gap-4">
                      <div className="col-span-1 text-xs uppercase tracking-widest text-gray-400 pt-1">Projects</div>
                      <div className="col-span-3 space-y-4">
                        {projects.map(proj => (
                          <div key={proj.id}>
                            <h3 className="font-medium text-black">{proj.name}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed mt-1">{proj.description}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
