import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // Create VPC and Fargate Cluster
    const vpc = new ec2.Vpc(this, 'MyVpc', {maxAzs: 2});

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

    const dockerImage = ecs.ContainerImage.fromAsset('.././app/', {
      buildArgs: {
        PORT: '8080',
      },
    });

    // Instantiate Fargate Service with cluster and image
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, "FargateService", {
      cluster,
      taskImageOptions: {
        // Add DockerFile as Image
        image: dockerImage
      }
    })

  }
}
