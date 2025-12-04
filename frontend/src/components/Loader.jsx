import { Loader2Icon } from 'lucide-react';
import React from 'react'

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <Loader2Icon className="animate-spin" />;
    </div>
  );
}

export default Loader