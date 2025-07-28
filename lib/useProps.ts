import { create } from 'zustand';

type PropTypes = {
  openSideMenu: boolean;
  setOpenSideMenu: () => void;
  isMobile: boolean;
  openSignIn: boolean,
  setIsMobile: (value: boolean) => void;
  setOpenSignInForm: (value: boolean) => void;
  openSignUp: boolean,
  setOpenSignUpForm: (value: boolean) => void;
  showWarningPwd: boolean;
  setShowWarningPwd: (value: boolean) => void;
  enteredCode: string;
  setEnteredCode: (value: string) => void;

}

const useProps = create<PropTypes>((set) => ({
  openSideMenu: false,
  setOpenSideMenu: () => set((state) => ({ openSideMenu: !state.openSideMenu })),
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
  openSignIn: false,
  setOpenSignInForm: (value) => set({ openSignIn: value }),
  openSignUp: false,
  setOpenSignUpForm: (value) => set({ openSignUp: value }),
  showWarningPwd: false,
  setShowWarningPwd: (value) => set({ showWarningPwd: value }),
  enteredCode: '',
  setEnteredCode: (value) => set({ enteredCode: value }),


}))

export default useProps;