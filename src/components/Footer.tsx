import { Shield, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Киберполиция</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Қазақстан Республикасының киберқауіпсіздік қызметі. 
              Азаматтарды интернеттегі алаяқтықтан қорғау.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Байланыс</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>102</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@cyberpolice.kz</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Астана, Қазақстан</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Пайдалы сілтемелер</h3>
            <div className="space-y-2 text-sm">
              <Link to="/check" className="block text-muted-foreground hover:text-primary transition-colors">
                Мошенникті тексеру
              </Link>
              <Link to="/report" className="block text-muted-foreground hover:text-primary transition-colors">
                Хабарлау жіберу
              </Link>
              <Link to="/test" className="block text-muted-foreground hover:text-primary transition-colors">
                Білім тесті
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Киберполиция. Барлық құқықтар қорғалған.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
