import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface DisclaimerDialogProps {
  open: boolean;
  onAccept: () => void;
}

const DisclaimerDialog = ({ open, onAccept }: DisclaimerDialogProps) => {
  const { t } = useLanguage();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <AlertDialogTitle className="text-xl">{t('disclaimer.title')}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base leading-relaxed">
            {t('disclaimer.body')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onAccept} className="w-full">
            {t('disclaimer.accept')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DisclaimerDialog;
