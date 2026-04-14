import type { PropsWithChildren } from 'react';

type ScreenCardProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
}>;

export function ScreenCard({ title, subtitle, children }: ScreenCardProps) {
  return (
    <section className="screen-card">
      <div className="screen-card__header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
      </div>
      <div className="screen-card__body">{children}</div>
    </section>
  );
}

