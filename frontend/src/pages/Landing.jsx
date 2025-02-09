import Wrapper from '../components/Wrapper';
import { ArrowRight, Shield, Stethoscope, Clock, Award } from 'lucide-react';

const Landing = () => {
  return (
    <Wrapper>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Transform Healthcare with AI-Powered Medical Documentation
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              Streamline your medical documentation process with our advanced AI technology. 
              Save time, reduce burnout, and focus more on patient care.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-50 transition inline-flex items-center">
              Request Demo <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">HIPAA Compliant</h3>
              <p className="text-gray-600">
                Secure and compliant documentation that protects patient information
                at every step.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Stethoscope className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Clinical Accuracy</h3>
              <p className="text-gray-600">
                AI-powered technology that ensures precise and accurate medical documentation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <Clock className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Time Saving</h3>
              <p className="text-gray-600">
                Reduce documentation time by up to 50% and focus more on patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Healthcare Providers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of healthcare professionals who are already using Abridge
              to transform their medical documentation workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <Award className="w-8 h-8 text-purple-600 mb-4" />
              <p className="text-gray-700 mb-4">
                "Abridge has revolutionized how we handle medical documentation. 
                It's accurate, fast, and incredibly user-friendly."
              </p>
              <div>
                <p className="font-semibold">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-500">Chief of Medicine, Metro Hospital</p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <Award className="w-8 h-8 text-purple-600 mb-4" />
              <p className="text-gray-700 mb-4">
                "The time savings are incredible. We've seen a 40% reduction in 
                documentation time since implementing Abridge."
              </p>
              <div>
                <p className="font-semibold">Dr. Michael Chen</p>
                <p className="text-sm text-gray-500">Family Practice Physician</p>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <Award className="w-8 h-8 text-purple-600 mb-4" />
              <p className="text-gray-700 mb-4">
                "The accuracy and compliance features give us peace of mind. 
                It's transformed our clinical workflow."
              </p>
              <div>
                <p className="font-semibold">Dr. Emily Rodriguez</p>
                <p className="text-sm text-gray-500">Director of Clinical Operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Medical Documentation?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare providers who are already saving time 
            and improving patient care with Abridge.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-50 transition inline-flex items-center">
            Get Started Today <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>
    </Wrapper>
  );
};

export default Landing;