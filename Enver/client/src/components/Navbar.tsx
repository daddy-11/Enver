import { useLocation } from "wouter";
import CardNav from "@/components/reactbits/CardNav";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [, setLocation] = useLocation();

  const handleNavigate = (href: string, e?: React.MouseEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (window.location.pathname !== "/") {
        setLocation("/");
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setLocation(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    {
      label: "Platform",
      bgColor: "#1E0C15",
      textColor: "#F7F3E9",
      links: [
        {
          label: "Overview",
          href: "/",
          ariaLabel: "Platform Overview",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/", e)
        },
        {
          label: "Enterprise Use Cases",
          href: "/services",
          ariaLabel: "Enterprise Use Cases",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/services", e)
        },
        {
          label: "Agent Console",
          href: "/playground",
          ariaLabel: "Autonomous Agent Console",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/playground", e)
        }
      ]
    },
    {
      label: "Flagship Engines",
      bgColor: "#2B121F",
      textColor: "#F7F3E9",
      links: [
        {
          label: "Artificer · MSME Underwriting",
          href: "/projects/artificer",
          ariaLabel: "Artificer MSME Underwriting",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/projects/artificer", e)
        },
        {
          label: "Arbiter · AST Cloud Firewall",
          href: "/projects/arbiter",
          ariaLabel: "Arbiter Multi-Cloud Firewall",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/projects/arbiter", e)
        },
        {
          label: "Cerberus · Zero-Trust Sentinel",
          href: "/projects/cerberus",
          ariaLabel: "Cerberus Zero-Trust Auditor",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/projects/cerberus", e)
        }
      ]
    },
    {
      label: "Institutional",
      bgColor: "#381829",
      textColor: "#F7F3E9",
      links: [
        {
          label: "Accreditations & Incubators",
          href: "/accreditations",
          ariaLabel: "Incubation & Accreditations",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/accreditations", e)
        },
        {
          label: "3-Year Accomplishments",
          href: "/about#accomplishments",
          ariaLabel: "3-Year Accomplishments and Production Milestones",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/about#accomplishments", e)
        },
        {
          label: "About Us",
          href: "/about",
          ariaLabel: "About Us · Engineering Core",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/about", e)
        },
        {
          label: "Contact Technical Team",
          href: "/contact",
          ariaLabel: "Contact Enver Team",
          onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigate("/contact", e)
        }
      ]
    }
  ];

  return (
    <CardNav
      logo={<Logo size="md" theme="plumwine" withEmblem={true} />}
      logoAlt="Enver AI Tech"
      items={navItems}
      baseColor="#F7F3E9"
      menuColor="#2B121F"
      buttonBgColor="#2B121F"
      buttonTextColor="#FFFFFF"
      ctaLabel="Get Started"
      onCtaClick={(e) => handleNavigate("/signup", e)}
      onLogoClick={(e) => handleNavigate("/", e)}
      ease="power3.out"
    />
  );
}
