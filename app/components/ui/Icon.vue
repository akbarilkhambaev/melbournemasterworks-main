<script setup lang="ts">
/**
 * Единственная точка входа для иконок.
 *
 * Раньше по разметке было раскидано 23 самодельных SVG-пути: разная толщина
 * штриха, разная сетка, а замок, облако и бирка были попросту криво нарисованы.
 * Lucide даёт профессиональную сетку 24px с единым штрихом.
 */
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  CloudRain,
  Expand,
  Eye,
  Hammer,
  Lock,
  Mail,
  MapPin,
  MoveHorizontal,
  Phone,
  PhoneCall,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Star,
  Tag,
  Wrench,
  X,
} from 'lucide-vue-next'

const icons = {
  'arrow-right': ArrowRight,
  camera: Camera,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  clipboard: ClipboardCheck,
  clock: Clock,
  cloud: CloudRain,
  expand: Expand,
  eye: Eye,
  hammer: Hammer,
  lock: Lock,
  mail: Mail,
  'map-pin': MapPin,
  'move-horizontal': MoveHorizontal,
  phone: Phone,
  'phone-call': PhoneCall,
  plus: Plus,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  spray: SprayCan,
  star: Star,
  tag: Tag,
  wrench: Wrench,
  x: X,
} as const

export type IconName = keyof typeof icons

const props = withDefaults(
  defineProps<{
    name: IconName
    /** Толщина штриха. 2 — базовая, 2.5 — для мелких размеров */
    stroke?: number
  }>(),
  { stroke: 2 },
)

const component = computed(() => icons[props.name])
</script>

<template>
  <component
    :is="component"
    :stroke-width="stroke"
    :absolute-stroke-width="true"
    aria-hidden="true"
    focusable="false"
  />
</template>
