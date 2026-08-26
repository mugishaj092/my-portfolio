import { AboutSection } from "@/components/about";
import { ExperienceSection } from "@/components/experience";
import { GithubActivity } from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects";
import { getGithubActivity } from "@/lib/github";

export default async function Home() {
  const githubActivity = await getGithubActivity();

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <GithubActivity data={githubActivity} />
    </main>
  );
}
