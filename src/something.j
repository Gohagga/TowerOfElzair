scope SoundLib initializer init

    globals
        private static StringTable soundIndices = null
        private static sound[] sounds = []
        private static integer soundCount = 0
    endglobals

    public function RegisterSound takes string message, sound s returns nothing
        // Save sound to the list of sounds
        set sounds[soundCount] = s

        // Map the index to the message
        set sound[message] = soundCount

        // Increment total sound count
        set soundCount = soundCount + 1
    endfunction

    public function GetSound takes string message returns sound
        return sounds[soundIndices[message]]
    endfunction

    private function Actions takes nothing returns nothing

        local player p = GetTriggerPlayer()
        local string message = StringCase(GetEventPlayerChatString(), false)
        local sound s = GetSound(message)
        
        if (s == null) return

        call PlaySoundBj(s)
    endfunction

    private function init takes nothing returns nothing

        local integer i = 0
        local trg = CreateTrigger()
    
        loop
            exitwhen (i > 11)
            call TriggerRegisterPlayerChatEvent(trg, Player(i), "", false)
            set i = i + 1
        endloop

        call TriggerAddAction(trg, function Actions)
        set soundIndices = StringTable.create()

        call RegisterSound("My might cannot be matched", gg_snd_NerubianCryptLordWhat4)
        call RegisterSound("nameofSound2", 2)
        call RegisterSound("nameofSound3", 3)
    endfunction

endscope