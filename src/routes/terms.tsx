import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — phBMI" }, { name: "description", content: "Terms of use and copyright policy for the phBMI website." }] }),
  component: () => (
    <PageShell>
      <PageHero kicker="Legal" title="Terms and Conditions" lead="Please read these terms carefully before using this website." />
      <div className="mt-8 prose prose-invert max-w-3xl text-foreground/85 space-y-4">
        <p>All content on this website — including videos, images, written material, and teaching modules — is the intellectual property of the Philippine Bamboo Musical Instruments Program and its partners.</p>
        <p>Unauthorized copying, downloading, reproduction, distribution, or commercial use of any content is strictly prohibited. Educational use with proper citation is encouraged; please use the built-in citation tool on each module.</p>
        <p>By using this website, you consent to anonymous analytics (country-level visitor counts) used solely to improve the program and report impact.</p>
      </div>
    </PageShell>
  ),
});
