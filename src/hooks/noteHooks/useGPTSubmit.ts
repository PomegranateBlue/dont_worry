'use client';

import { useMutation } from '@tanstack/react-query';

interface GPTRouteProps {
  topic: string | null;
  emotions: string[];
  message: string;
}
