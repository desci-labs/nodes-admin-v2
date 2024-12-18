"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  Pen,
} from "lucide-react";
import { Community } from "@/lib/api";
import ExpandableMarkdown from "@/components/molecules/ExpandableMarkdown";
import CommunityAttestations from "@/components/molecules/CommunityAttestations";
import CommunityMembers from "../molecules/CommunityMembers";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
};

type AttestationVersion = {
  id: number;
  name: string;
  image_url: string;
};

type CommunityProps = {
  community: Community;
  // users: User[];
  // allAttestations: AttestationVersion[];
};

export default function Component({ community }: CommunityProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto pt-4 pb-6">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={
                  community.image_url || "/placeholder.svg?height=300&width=400"
                }
                alt={community.name}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex items-center justify-between w-full">
                <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => router.push(`${community.id}/edit`)}>
                  <Pen className="w-4 h-4" />
                  <span className="ml-1">Edit</span>
                </Button>
              </div>
              <p className="text-xl text-muted-foreground mb-4">
                {community.subtitle}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {community.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <ExpandableMarkdown
                className="text-muted-foreground markdown w-full mx-auto"
                text={community.description}
                containerClassName={"!left-0"}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* attestations section  */}
          <CommunityAttestations community={community} />
          {/* attestations section  */}

          {/* Links section  */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {community.links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Links section  */}

          {/* other details  */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Community Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <dt className="font-medium">Created</dt>
                  <dd className="text-muted-foreground">
                    {new Date(community.createdAt).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Last Updated</dt>
                  <dd className="text-muted-foreground">
                    {new Date(community.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">Slug</dt>
                  <dd className="text-muted-foreground">{community.slug}</dd>
                </div>
                <div>
                  <dt className="font-medium">Visibility</dt>
                  <dd className="text-muted-foreground">
                    {community.hidden ? "Hidden" : "Visible"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          {/* other details  */}
        </div>

        <div>
          <CommunityMembers community={community} />

          <Card>
            <CardHeader>
              <CardTitle>Engagement Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Total Engagements</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="h-6 w-6 text-primary mb-1" />
                      <span className="text-lg font-bold">
                        {community.engagements.reactions}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Reactions
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="h-6 w-6 text-primary mb-1" />
                      <span className="text-lg font-bold">
                        {community.engagements.annotations}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Annotations
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-6 w-6 text-primary mb-1" />
                      <span className="text-lg font-bold">
                        {community.engagements.verifications}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Verifications
                      </span>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Verified Engagements</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <ThumbsUp className="h-6 w-6 text-green-500 mb-1" />
                      <span className="text-lg font-bold">
                        {community.verifiedEngagements.reactions}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Reactions
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageSquare className="h-6 w-6 text-green-500 mb-1" />
                      <span className="text-lg font-bold">
                        {community.verifiedEngagements.annotations}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Annotations
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <CheckCircle className="h-6 w-6 text-green-500 mb-1" />
                      <span className="text-lg font-bold">
                        {community.verifiedEngagements.verifications}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Verifications
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
