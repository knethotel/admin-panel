import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const CardWrapper = ({ title, children }: Props) => {
  return (
    <Card title={title} className="bg-transparent">
      <CardHeader>
        <h2 className="text-xl font-semibold"> {title}</h2>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
