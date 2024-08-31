
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@/lib/supabase/client";
import { useCallback } from "react";
const useAuth = (email) => {
  // const supabase = createClientComponentClient();

  const supabase = createClient();

  const login = useCallback(async (email) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({ email })

      if (!error) {
        alert('Check your email for the login link!')
        return {
          success: true,
        }
      }

      throw error
    } catch (e) {
      alert(e.message)
      return {
        success: false,
        e,
      }
    }
  }, [email]);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        error,
      }
    }

    return {
      success: true,
      redirectTo: '/',
    }
  }, []);

  const onError = useCallback(async (error) => {
    console.error(error)
    return { error }
  }, []);

  const check = useCallback(async () => {
    try {
      const { data } = await supabase.auth.getSession()
      const { session } = data;
      if (!session) {
        return {
          authenticated: false,
          error: {
            message: 'Check failed',
            name: 'Session not found',
          },
          logout: true,
          redirectTo: '/login',
        }
      }
    } catch (error) {
      return {
        authenticated: false,
        error: error || {
          message: 'Check failed',
          name: 'Not authenticated',
        },
        logout: true,
        redirectTo: '/login',
      }
    }

    return {
      authenticated: true,
    }
  }, []);
  
  const getIdentity = useCallback(async () => {
    const { data } = await supabase.auth.getUser()

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      }
    }

    return null
  }, []);

  return {
    login,
    logout,
    onError,
    check,
    getIdentity
  }
}

export default useAuth;