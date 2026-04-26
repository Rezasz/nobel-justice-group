import { readJson } from './blob'
import { team as staticTeam } from '@/data/team'
import { blogPosts as staticBlog } from '@/data/blog'
import { famousClients as staticClients } from '@/data/clients'
import { faqItems as staticFaq } from '@/data/faq'
import { officeCities as staticOffices } from '@/data/services'
import { partners as staticPartners } from '@/data/partners'
import type { TeamMember, BlogPost, FamousClient, FaqItem, OfficeCity, Partner } from '@/data/types'

export async function getTeam(): Promise<TeamMember[]> {
  return (await readJson<TeamMember[]>('njg/data/team.json')) ?? staticTeam
}

export async function getBlog(): Promise<BlogPost[]> {
  return (await readJson<BlogPost[]>('njg/data/blog.json')) ?? staticBlog
}

export async function getClients(): Promise<FamousClient[]> {
  return (await readJson<FamousClient[]>('njg/data/clients.json')) ?? staticClients
}

export async function getFaq(): Promise<FaqItem[]> {
  return (await readJson<FaqItem[]>('njg/data/faq.json')) ?? staticFaq
}

export async function getOffices(): Promise<OfficeCity[]> {
  return (await readJson<OfficeCity[]>('njg/data/offices.json')) ?? staticOffices
}

export async function getPartners(): Promise<Partner[]> {
  return (await readJson<Partner[]>('njg/data/partners.json')) ?? staticPartners
}
