import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Home() {
  
  return (
    <>
      <Header />
      <div className="flex flex-col gap-20 xl:mx-70 mx-5 md:mx-50 py-5">
        <div className="flex flex-col gap-4 mb-10 min-h-[50vh]">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p>At Holidaze, your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform to book or list venues.</p>
          <div>
            <h5 className="text-xl font-bold">Information We Collect</h5>
            <p>When you use Holidaze, we may collect the following information:</p>
            <ul className="ml-10">
                <li className="list-disc">Personal detail such as name, email address, and contact information</li>
                <li className="list-disc">Account details when you register as a user or venue host</li>
                <li className="list-disc">Booking and listing information related to venues</li>
            </ul>
            <p>We only collect information that is necessary to provide and improve our services.</p>
          </div>
          <div>
            <h5 className="text-xl font-bold">How We Use Your Information</h5>
            <p>Your information is used to:</p>
            <ul className="ml-10">
                <li className="list-disc">Create and manage your account</li>
                <li className="list-disc">Process bookings with venue listings</li>
                <li className="list-disc">Communicate with you about your bookings, account, or updates</li>
            </ul>
          </div>
          <h5 className="text-xl font-bold">Data Protection</h5>
          <p>We take reasonable steps to protect your personal data from unauthorized access, loss, or misuse. Only authorized personnel have access to sensitive information, and data is handled securely.</p>
        </div>
        <Footer />
      </div>
    </>
  );
}
