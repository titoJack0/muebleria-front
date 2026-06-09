import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
import type { User } from '../../types';

// Esquema de validación usando Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    // Simulación de llamada a la API
    setTimeout(() => {
      const mockUser: User = { id: 1, name: "John Doe", email: data.email, role: "customer" };
      login("mock_token_123", mockUser);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-sm bg-white p-10 shadow-xl border border-wood/10"
      >
        <div>
          <h2 className="mt-6 text-center font-serif text-3xl font-bold tracking-tight text-wood-dark">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-earth">
            Or{' '}
            <Link to="/register" className="font-medium text-wood hover:text-gold transition-colors">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-wood/30 text-wood focus:ring-wood"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-earth">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-wood hover:text-gold transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            Sign In
          </Button>
        </form>
      </motion.div>
    </div>
  );
};
