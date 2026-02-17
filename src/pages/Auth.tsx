import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");
const nameSchema = z.string().min(2, "Name must be at least 2 characters");

type AuthMode = "login" | "signup" | "forgot";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});

  useEffect(() => {
    if (user) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
    if (mode !== "forgot") {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;
    }
    if (mode === "signup") {
      const nameResult = nameSchema.safeParse(fullName);
      if (!nameResult.success) newErrors.name = nameResult.error.errors[0].message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: t('auth.loginFailed'),
            description: error.message.includes("Invalid login credentials") ? t('auth.invalidCredentials') : error.message,
            variant: "destructive",
          });
        } else {
          toast({ title: t('auth.welcomeBack') + '!', description: "" });
        }
      } else if (mode === "signup") {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({ title: t('auth.accountExists'), description: t('auth.accountExistsDesc'), variant: "destructive" });
          } else {
            toast({ title: t('auth.signUpFailed'), description: error.message, variant: "destructive" });
          }
        } else {
          toast({ title: t('auth.accountCreated'), description: t('auth.accountCreatedDesc') });
        }
      } else if (mode === "forgot") {
        const { error } = await resetPassword(email);
        if (error) {
          toast({ title: t('auth.resetFailed'), description: error.message, variant: "destructive" });
        } else {
          toast({ title: t('auth.checkEmail'), description: t('auth.checkEmailDesc') });
          setMode("login");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {mode === "login" && t('auth.welcomeBack')}
              {mode === "signup" && t('auth.createAccount')}
              {mode === "forgot" && t('auth.resetPassword')}
            </h1>
            <p className="text-muted-foreground">
              {mode === "login" && t('auth.signInSubtitle')}
              {mode === "signup" && t('auth.signUpSubtitle')}
              {mode === "forgot" && t('auth.resetSubtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('auth.fullName')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="fullName" type="text" placeholder={t('auth.fullNamePlaceholder')} value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('auth.emailLabel')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder={t('auth.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder={t('auth.passwordPlaceholder')} value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>
            )}

            {mode === "login" && (
              <button type="button" onClick={() => setMode("forgot")} className="text-sm text-primary hover:underline">
                {t('auth.forgotPassword')}
              </button>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
              ) : (
                <>
                  {mode === "login" && t('auth.signIn')}
                  {mode === "signup" && t('auth.signUpBtn')}
                  {mode === "forgot" && t('auth.sendResetLink')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            {mode === "login" && (
              <p className="text-sm text-muted-foreground">
                {t('auth.noAccount')}{" "}
                <button onClick={() => setMode("signup")} className="text-primary hover:underline font-medium">{t('auth.signUpLink')}</button>
              </p>
            )}
            {(mode === "signup" || mode === "forgot") && (
              <p className="text-sm text-muted-foreground">
                {t('auth.haveAccount')}{" "}
                <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">{t('auth.signInLink')}</button>
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
