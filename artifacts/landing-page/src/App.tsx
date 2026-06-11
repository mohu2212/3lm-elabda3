import React, { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, PhoneCall, CheckCircle2, Factory, Home as HomeIcon, 
  Store, MapPin, ShieldCheck, Clock, MessageCircle, 
  Menu, X, Tent, Warehouse, Hotel, TentTree, 
  Fuel, Pickaxe, BookOpen, Castle, Wrench, ChevronLeft
} from "lucide-react";
import NotFound from "@/pages/not-found";

// Import Brand Assets
import logoPath from "@assets/logo_1781179486280.png";
import photo1 from "@assets/WhatsApp_Image_2026-06-_1781177922104.jpeg";
import photo2 from "@assets/WhatsApp_Image_2026-06-11__1781177922104.jpeg";
import photo3 from "@assets/WhatsApp_Image_2026-06-11_a_1781177922104.jpeg";
import photo4 from "@assets/WhatsApp_Image_2026-06-11_at_14.30.36_1781177922104.jpeg";

const queryClient = new QueryClient();

// Data
const phoneNumber = "0552119299";
const whatsappLink = `https://wa.me/966552119299`;

const services = [
  { title: "مظلات وسواتر السيارات والمنشآت", icon: Tent },
  { title: "المستودعات والمخازن اللوجستية", icon: Warehouse },
  { title: "الهناجر والمستودعات الحديدية", icon: Factory },
  { title: "الفلل السكنية والبيوت الاستثمارية", icon: HomeIcon },
  { title: "المولات والمراكز التجارية الكبرى", icon: Store },
  { title: "الفنادق والمنشآت السياحية", icon: Hotel },
  { title: "الاستراحات المفتوحة والمغلقة", icon: TentTree },
  { title: "المنتجعات السياحية والترفيهية", icon: Castle },
  { title: "محطات الوقود ومراكز الخدمة", icon: Fuel },
  { title: "تسوية الأراضي وتمهيدها", icon: Pickaxe },
  { title: "المساجد ودور العبادة", icon: BookOpen },
  { title: "القصور والمجالس الكبرى", icon: Castle },
  { title: "الملاحق الخارجية والترميمات", icon: Wrench },
];

const features = [
  { title: "تغطية شاملة لجميع مناطق المملكة", desc: "نصل إليك أينما كنت في أنحاء المملكة.", icon: MapPin },
  { title: "12 رصيف جاهز وسوايد كاملة", desc: "قدرة استيعابية وتنفيذية ضخمة تلبي تطلعات مشاريعكم.", icon: Factory },
  { title: "العمل على مدار الساعة", desc: "فرقنا تعمل 24 ساعة / 7 أيام لضمان تسليم مشاريعكم في وقتها.", icon: Clock },
  { title: "أوراق رسمية معتمدة ومكتملة", desc: "جميع أعمالنا مدعمة بالضمانات والتراخيص الحكومية اللازمة.", icon: ShieldCheck },
  { title: "خبرة واسعة", desc: "في كافة أنواع المشاريع الكبرى والسكنية والتجارية.", icon: Building2 },
];

const projects = [
  { img: photo1, title: "مستودعات ومخازن لوجستية ضخمة" },
  { img: photo2, title: "فلل وقصور سكنية حديثة" },
  { img: photo3, title: "مشاريع سكنية وتجارية متكاملة" },
  { img: photo4, title: "تخطيط وبناء منشآت كبرى" },
];

// Components
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoPath} alt="عالم الإبداع المتطورة" className="h-12 w-12 rounded object-cover border border-primary/20" />
            <div className="hidden md:block">
              <h1 className={`font-bold text-lg leading-none ${isScrolled ? "text-secondary" : "text-white"}`}>عالم الإبداع المتطورة</h1>
              <span className={`text-xs ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}>للمقاولات العامة</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className={`font-medium hover:text-primary transition-colors ${isScrolled ? "text-secondary" : "text-white"}`}>من نحن</a>
            <a href="#services" className={`font-medium hover:text-primary transition-colors ${isScrolled ? "text-secondary" : "text-white"}`}>خدماتنا</a>
            <a href="#projects" className={`font-medium hover:text-primary transition-colors ${isScrolled ? "text-secondary" : "text-white"}`}>مشاريعنا</a>
            <a href="#contact" className={`font-medium hover:text-primary transition-colors ${isScrolled ? "text-secondary" : "text-white"}`}>اتصل بنا</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant={isScrolled ? "default" : "secondary"} className="font-bold">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 ml-2" />
                واتساب
              </a>
            </Button>
          </div>

          <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={`w-6 h-6 ${isScrolled ? 'text-secondary' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-secondary' : 'text-white'}`} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="font-medium text-secondary hover:text-primary p-2">من نحن</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="font-medium text-secondary hover:text-primary p-2">خدماتنا</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="font-medium text-secondary hover:text-primary p-2">مشاريعنا</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="font-medium text-secondary hover:text-primary p-2">اتصل بنا</a>
              <Button asChild className="w-full mt-2">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">تواصل عبر الواتساب</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-secondary">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img src={photo4} alt="مشاريع المقاولات الكبرى" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold mb-6">
              مقاولات عامة معتمدة 100%
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.4] md:leading-[1.35] mb-6">
              نبني <span className="text-primary">الوطن</span>،<br/> نؤسس للمستقبل.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
              شركة عالم الإبداع المتطورة للمقاولات العامة. 
              نقدم حلول إنشائية ضخمة بمعايير عالمية لتلبية طموحات رؤية المملكة 2030. نغطي جميع مناطق المملكة على مدار الساعة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg font-bold">
                <a href={`tel:${phoneNumber}`}>
                  <PhoneCall className="w-5 h-5 ml-2" />
                  اتصل بنا الآن
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg font-bold bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 ml-2" />
                  تواصل عبر الواتساب
                </a>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>أوراق رسمية كاملة</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>12 رصيف جاهز</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-secondary mb-6 leading-[1.45]">
              قوة تنفيذية <span className="text-primary">هائلة</span> تمتد عبر المملكة
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              نحن في شركة عالم الإبداع المتطورة نؤمن بأن المشاريع الكبرى تتطلب إمكانيات غير عادية. لذلك سخرنا كافة جهودنا لامتلاك قدرة استيعابية وتشغيلية ضخمة تضمن تنفيذ أضخم المشاريع.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "أوراق رسمية معتمدة ومكتملة من كافة الجهات المعنية.",
                "12 رصيف جاهز للعمل مع سوايد كاملة.",
                "عمل متواصل على مدار 24 ساعة طوال أيام الأسبوع.",
                "تغطية جغرافية شاملة لجميع مدن ومناطق المملكة."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-secondary">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="default" className="font-bold">
              <a href="#services">اكتشف خدماتنا <ChevronLeft className="w-4 h-4 mr-2" /></a>
            </Button>
          </FadeIn>
          
          <FadeIn delay={0.2} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src={photo1} alt="مشاريعنا" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl text-white">
                  <div className="text-4xl font-black text-primary mb-2">24/7</div>
                  <div className="font-bold text-lg">جاهزية تامة في أي وقت وأي مكان في المملكة</div>
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-sm tracking-wider uppercase mb-2 block">خدمات المقاولات</span>
          <h2 className="text-3xl md:text-5xl font-black text-secondary mb-6 leading-[1.45]">
            حلول إنشائية متكاملة لجميع القطاعات
          </h2>
          <p className="text-lg text-muted-foreground">
            نقدم مجموعة واسعة من الخدمات الإنشائية التي تلبي احتياجات المشاريع السكنية والتجارية والصناعية بأعلى معايير الجودة.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.05}>
              <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 flex flex-col h-full items-start">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                  <div className="mt-auto pt-4 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                    طلب الخدمة <ChevronLeft className="w-4 h-4 mr-1" />
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-[1.45]">
            لماذا تختار <span className="text-primary">عالم الإبداع المتطورة</span>؟
          </h2>
          <p className="text-lg text-gray-400">
            لأننا لا نبني مجرد هياكل، بل نبني ثقة تدوم لعقود. مقوماتنا تجعلنا الخيار الأول للمشاريع الكبرى.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-secondary mb-4 leading-[1.45]">
              نظرة على <span className="text-primary">مشاريعنا</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              نماذج من أعمالنا التي تعكس التزامنا بالجودة العالية والتنفيذ الدقيق في مختلف قطاعات المقاولات.
            </p>
          </div>
          <Button variant="outline" className="shrink-0 font-bold border-primary text-primary hover:bg-primary hover:text-white">
            شاهد جميع المشاريع
          </Button>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 0.1} className="group relative overflow-hidden rounded-2xl h-[400px]">
              <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <div className="w-10 h-1 bg-primary mb-4 rounded-full"></div>
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">مشروع تم تنفيذه وفق أعلى المعايير الهندسية ومعايير السلامة.</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn>
          <div className="bg-secondary rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Pattern background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23C9A84C\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.45]">
                هل لديك مشروع ضخم يحتاج إلى <span className="text-primary">خبرة موثوقة</span>؟
              </h2>
              <p className="text-xl text-gray-300 mb-10">
                نحن جاهزون للبدء فوراً. تواصل معنا لمناقشة تفاصيل مشروعك والحصول على استشارة مجانية وعرض سعر تنافسي.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="h-16 px-8 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                  <a href={`tel:${phoneNumber}`}>
                    <PhoneCall className="w-6 h-6 ml-2" />
                    اتصل بنا الآن
                  </a>
                </Button>
                <Button asChild size="lg" className="h-16 px-8 text-lg font-bold bg-[#25D366] hover:bg-[#1EBE5A] text-white shadow-lg shadow-[#25D366]/20">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-6 h-6 ml-2" />
                    تواصل عبر الواتساب
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img src={logoPath} alt="عالم الإبداع المتطورة" className="h-14 w-14 rounded bg-white p-1" />
              <div>
                <h3 className="font-black text-xl text-white">عالم الإبداع المتطورة</h3>
                <p className="text-primary font-bold">للمقاولات العامة</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              شريكك الموثوق في عالم المقاولات. نبني بخبرة واحترافية تلبي طموحاتك وتحقق رؤية المملكة، مع التزام تام بالجودة والوقت.
            </p>
            <div className="flex gap-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={`tel:${phoneNumber}`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors">
                <PhoneCall className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-primary transition-colors">من نحن</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">خدماتنا</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">مشاريعنا</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">اتصل بنا</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold text-lg mb-6">معلومات التواصل</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>جميع مناطق المملكة العربية السعودية</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span dir="ltr">{phoneNumber}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>مفتوح 24 ساعة / 7 أيام</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} شركة عالم الإبداع المتطورة للمقاولات العامة. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" />
              أوراق رسمية معتمدة
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce hover:animate-none"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
      </span>
    </a>
  );
}

function Home() {
  return (
    <div className="min-h-screen font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyUs />
      <Projects />
      <CTA />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
