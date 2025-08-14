import { ref, provide, type Ref, type InjectionKey } from 'vue'

// Définir l'interface pour les propriétés que nous voulons fournir
interface SidebarState {
  isSidebarExpanded: Ref<boolean>;
  toggleSidebarExpanded: () => void;
}

// Créer une clé d'injection typée
export const sidebarStateKey: InjectionKey<SidebarState> = Symbol('sidebarState')
