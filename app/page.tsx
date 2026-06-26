import { createClient } from '@/lib/supabase/server';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import CasesOfWeek from '@/components/CasesOfWeek';
import Modalities from '@/components/Modalities';
import Interventional from '@/components/Interventional';
import IaSection from '@/components/IaSection';
import MSKGuide from '@/components/MSKGuide';
import CasesQuiz from '@/components/CasesQuiz';
import Calls from '@/components/Calls';
import Congresses from '@/components/Congresses';
import Magazine from '@/components/Magazine';
import About from '@/components/About';
import Footer from '@/components/Footer';
import FloatingButton from '@/components/FloatingButton';
import ScrollAnimator from '@/components/ScrollAnimator';
import { getCasesForWeek } from '@/lib/data/cases';
import { getQuizForWeek } from '@/lib/data/quiz';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const weeklyCases = getCasesForWeek();
  const weeklyQuiz  = getQuizForWeek();

  return (
    <>
      <Nav user={user} />
      <main>
        <Hero />
        <CasesOfWeek cases={weeklyCases} />
        <Modalities />
        <Interventional />
        <IaSection />
        <MSKGuide />
        <CasesQuiz quiz={weeklyQuiz} />
        <Calls />
        <Congresses />
        <Magazine />
        <About />
      </main>
      <Footer />
      <FloatingButton />
      <ScrollAnimator />
    </>
  );
}
