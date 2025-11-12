import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type BackLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

export default function BackLink({ to, children, className }: BackLinkProps) {
  return (
    <div className={`flex justify-center ${className || ''}`}>
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm shadow-sm hover:shadow-md hover:bg-muted transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{children}</span>
      </Link>
    </div>
  );
}