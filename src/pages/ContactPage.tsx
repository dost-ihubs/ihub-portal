import ContactIntro from "../components/contact/ContactIntro";
import ContactDetails from "../components/contact/ContactDetails";
import ContactForm from "../components/contact/ContactForm";
import FacebookCTA from "../components/contact/FacebookCTA";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <>
      <main className="bg-white min-h-screen pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-[1250px] mx-auto">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <ContactIntro />
              <ContactDetails />
            </div>

            <ContactForm />
          </section>

          <FacebookCTA />
        </div>
      </main>

      <Footer />
    </>
  );
}