import { z } from "zod";
import { IAPConfig } from "../../models/IAPConfig";
import Image from "next/image";

export const CommentModel = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  time: z.string(),
  star: z.number(),
});
type CommentModel = z.infer<typeof CommentModel>;

interface CommentViewProps {
  comment: CommentModel;
}

function CommentView(props: CommentViewProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        border: "2px solid #E3E1E1",
        borderRadius: 20,
        gap: 12,
        minWidth: 320,
      }}
      className="w-full px-2 py-4 justify-between"
    >
      <div className="flex flex-col gap-2">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              textAlign: "start",
            }}
          >
            <span style={{ fontSize: 20, fontWeight: 600, textAlign: "start" }}>
              {props.comment.title}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {Array(props.comment.star)
              .fill(0)
              .map((_, idx) => {
                return (
                  <Image
                    key={idx}
                    src={"/assets/icStar.png"}
                    alt={""}
                    width={18}
                    height={18}
                  />
                );
              })}
          </div>
        </div>

        <span
          style={{
            textAlign: "start",
            fontSize: 16,
            color: "#59617A",
          }}
        >
          {props.comment.description}
        </span>
      </div>

      <span
        style={{
          textAlign: "start",
          fontSize: 14,
          color: "#2D3142",
        }}
      >{`- ${props.comment.author}, ${props.comment.time}`}</span>
    </div>
  );
}

export function IAPMillionsUsersLoveUsView(props: { config: IAPConfig }) {
  const parts = props.config.millionsOfUsers.split("%@");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <span
        style={{
          textAlign: "start",
          margin: "0px 24px",
          marginTop: 24,
        }}
        className="text-[23px] leading-[32px] font-bold text-[#2D3142]"
      >
        {parts[0]}
        {
          <span style={{ color: "#FF3D60" }}>
            {props.config.millionsOfUseHighlight}
          </span>
        }
        {parts[1]}
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          padding: "0px 24px",
          gap: 16,
          scrollbarWidth: "none",
        }}
      >
        {props.config.comments.map((comment: CommentModel, idx: number) => {
          return <CommentView key={idx} comment={comment} />;
        })}
      </div>
      <Image
        src={"/assets/icTrustedBy.png"}
        alt={""}
        width={327}
        height={140}
        className="w-auto h-auto"
        style={{
          margin: "0px 24px",
        }}
      />
    </div>
  );
}
