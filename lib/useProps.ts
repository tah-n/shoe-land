import { create } from 'zustand';

type PropTypes = {
  openSideMenu: boolean;
  setOpenSideMenu: () => void;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

const useProps = create<PropTypes>((set) => ({
  openSideMenu: false,
  setOpenSideMenu: () => set((state) => ({ openSideMenu: !state.openSideMenu })),
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value })
}))

export default useProps;