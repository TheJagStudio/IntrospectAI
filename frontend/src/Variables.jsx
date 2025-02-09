import { atom } from 'jotai';

export const defaultConversation = [];

export const conversationAtom = atom(defaultConversation);
export const isRecordingAtom = atom(false);
export const streamingAvatarAtom = atom(null);
export const streamAtom = atom(null);
export const speakFunctionAtom = atom(null);
